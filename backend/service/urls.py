# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import ComponentViewSet, VehicleViewSet, IssueViewSet, TransactionViewSet, revenue_view

# router = DefaultRouter()
# router.register('components', ComponentViewSet)
# router.register('vehicles', VehicleViewSet)
# router.register('issues', IssueViewSet)
# router.register('transactions', TransactionViewSet)

# urlpatterns = [
#     path('', include(router.urls)),
#     path('revenue/', revenue_view, name='revenue-view'),
# ]


from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ComponentViewSet, VehicleViewSet, IssueViewSet, TransactionViewSet, RevenueViewSet

# Create a router and register the viewsets with the router
router = DefaultRouter()
router.register('components', ComponentViewSet)
router.register('vehicles', VehicleViewSet)
router.register('issues', IssueViewSet)
router.register('transactions', TransactionViewSet)
router.register('revenues', RevenueViewSet)

# Include the router's URLs in the app's URL configuration
urlpatterns = [
    path('', include(router.urls)),
]
