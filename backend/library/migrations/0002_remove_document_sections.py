# Generated by Django 3.2.23 on 2023-11-24 04:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='document',
            name='sections',
        ),
    ]
