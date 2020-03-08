from import_export.admin import ImportExportModelAdmin
from django.contrib import admin
from .models import Text

@admin.register(Text)
class TextAdmin(ImportExportModelAdmin):
   pass