# from django.contrib import admin

# # Register your models here.

from django.contrib import admin
from .models import Component, Vehicle, Issue, Transaction, Revenue

# Customizing the Component admin interface
@admin.register(Component)
class ComponentAdmin(admin.ModelAdmin):
    list_display = ('name', 'repair_price', 'purchase_price')
    search_fields = ('name',)
    list_filter = ('repair_price', 'purchase_price')


# Customizing the Vehicle admin interface
@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('name', 'registration_number', 'added_date')
    search_fields = ('name', 'registration_number')
    list_filter = ('added_date',)


# Customizing the Issue admin interface
@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('vehicle', 'component', 'issue_type', 'price', 'created_at')
    search_fields = ('vehicle__name', 'component__name', 'issue_type')
    list_filter = ('issue_type', 'created_at')
    autocomplete_fields = ('vehicle', 'component')


# Customizing the Transaction admin interface
@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('vehicle', 'total_cost', 'created_at')
    search_fields = ('vehicle__registration_number',)
    list_filter = ('created_at',)


# Customizing the Revenue admin interface
@admin.register(Revenue)
class RevenueAdmin(admin.ModelAdmin):
    list_display = ('date', 'amount')
    search_fields = ('date',)
    list_filter = ('date',)
