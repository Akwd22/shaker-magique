from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

class LetterPasswordValidator:
    """Condition de validation des mots de passe

    Raises:
        ValidationError: Le mot de passe ne contient que des lettres
    """

    def validate(self, password):
        if password.isalpha():
            raise ValidationError(_("Le mot de passe doit contenir au minimum 1 chiffre."))

    def get_help_text(self):
        return _("Le mot de passe doit contenir au minimum 1 chiffre.")