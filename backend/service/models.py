from django.db import models
from datetime import date

# Component Model
class Component(models.Model):
    name = models.CharField(max_length=100)
    repair_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.name


# Vehicle Model
class Vehicle(models.Model):
    name = models.CharField(max_length=100)
    registration_number = models.CharField(max_length=100, unique=True)
    added_date = models.DateField(default=date.today)

    def __str__(self):
        return f"{self.name} ({self.registration_number})"


# Issue Model
class Issue(models.Model):
    REPAIR = 'repair'
    REPLACE = 'replace'
    ISSUE_TYPE_CHOICES = [
        (REPAIR, 'Repair'),
        (REPLACE, 'Replace'),
    ]

    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='issues')
    component = models.ForeignKey(Component, on_delete=models.CASCADE, related_name='issues')
    issue_type = models.CharField(max_length=10, choices=ISSUE_TYPE_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Auto-fetch price based on issue type
        if self.issue_type == self.REPAIR:
            self.price = self.component.repair_price
        elif self.issue_type == self.REPLACE:
            self.price = self.component.purchase_price
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Issue: {self.vehicle.name} - {self.component.name} ({self.issue_type})"


# Transaction Model
class Transaction(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='transactions')
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transaction for {self.vehicle.registration_number} - ₹{self.total_cost}"


# Revenue Model
class Revenue(models.Model):
    date = models.DateField(default=date.today)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Revenue on {self.date} - ₹{self.amount}"
