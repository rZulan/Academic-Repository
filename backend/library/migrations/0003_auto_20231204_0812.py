# Generated by Django 3.2.23 on 2023-12-04 00:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0002_remove_document_sections'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='department',
            field=models.CharField(default=' ', max_length=256),
            preserve_default=False,
        ),
        migrations.RemoveField(
            model_name='document',
            name='authors',
        ),
        migrations.AddField(
            model_name='document',
            name='authors',
            field=models.CharField(default=' ', max_length=256),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='document',
            name='course',
            field=models.CharField(default=' ', max_length=256),
            preserve_default=False,
        ),
    ]