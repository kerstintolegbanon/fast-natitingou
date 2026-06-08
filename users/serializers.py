from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'role', 'phone']
        read_only_fields = ['id']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'role', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            role=validated_data['role'],
            password=validated_data['password']
        )
        return user

class CustomLoginSerializer(serializers.Serializer):
    identifiant = serializers.CharField()
    password = serializers.CharField(write_only=True)
    role = serializers.CharField(read_only=True)

    def validate(self, data):
        identifiant = data.get('identifiant')
        password = data.get('password')

        # Cherche d'abord par email (admin et enseignant)
        user = authenticate(username=identifiant, password=password)

        # Si pas trouvé, cherche étudiant par nom complet
        if not user:
            try:
                # Cherche par nom complet (prénom nom ou nom prénom)
                parts = identifiant.strip().split()
                if len(parts) >= 2:
                    # Essai 1 : first_name = premier mot, last_name = reste
                    users = User.objects.filter(
                        first_name__iexact=parts[0],
                        last_name__iexact=' '.join(parts[1:]),
                        role='student'
                    )
                    # Essai 2 : last_name = premier mot, first_name = reste
                    if not users.exists():
                        users = User.objects.filter(
                            last_name__iexact=parts[0],
                            first_name__iexact=' '.join(parts[1:]),
                            role='student'
                        )
                    if users.exists():
                        student_user = users.first()
                        # Vérifie le matricule comme mot de passe
                        if student_user.check_password(password):
                            user = student_user
            except Exception:
                pass

        if not user:
            raise serializers.ValidationError(
                'Identifiant ou mot de passe incorrect.'
            )

        if not user.is_active:
            raise serializers.ValidationError('Ce compte est désactivé.')

        data['user'] = user
        return data