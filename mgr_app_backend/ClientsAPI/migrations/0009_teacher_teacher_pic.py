# Generated by Django 4.0 on 2022-06-10 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ClientsAPI', '0008_alter_clients_first_name_alter_clients_instrument_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='teacher',
            name='teacher_pic',
            field=models.ImageField(blank=True, default='ProfilPic.png', null=True, upload_to=''),
        ),
    ]
