# Generated by Django 3.2.4 on 2021-06-13 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travelApp', '0004_auto_20210613_0548'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='trip',
            options={'ordering': ['created']},
        ),
        migrations.AddField(
            model_name='trip',
            name='created',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
