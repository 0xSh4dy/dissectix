# Generated by Django 4.2.4 on 2023-09-10 11:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dissectix', '0009_remove_challenge_solve_count'),
    ]

    operations = [
        migrations.AlterField(
            model_name='challenge',
            name='solve_percentage',
            field=models.JSONField(default=dict),
        ),
    ]
