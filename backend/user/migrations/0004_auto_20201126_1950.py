# Generated by Django 3.1.1 on 2020-11-26 18:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_auto_20201126_1948'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='id_hote',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
    ]