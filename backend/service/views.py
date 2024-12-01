from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from .models import Component, Vehicle, Issue, Transaction, Revenue
# from .serializers import ComponentSerializer, VehicleSerializer, IssueSerializer, TransactionSerializer, RevenueSerializer
from .serializers import ComponentSerializer, VehicleSerializer, IssueSerializer, TransactionSerializer, RevenueSerializer
from datetime import date, timedelta
from django.db.models import Sum
# service/views.py



class ComponentViewSet(ModelViewSet):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer


class VehicleViewSet(ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer


class IssueViewSet(ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer


class TransactionViewSet(ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    @action(detail=False, methods=['post'])
    def create_transaction(self, request):
        vehicle_id = request.data.get('vehicle_id')
        try:
            vehicle = Vehicle.objects.get(id=vehicle_id)
            total_cost = Issue.objects.filter(vehicle=vehicle).aggregate(Sum('price'))['price__sum']
            transaction = Transaction.objects.create(vehicle=vehicle, total_cost=total_cost)
            serializer = self.get_serializer(transaction)
            return Response(serializer.data)
        except Vehicle.DoesNotExist:
            return Response({"error": "Vehicle not found"}, status=404)


@api_view(['GET'])
def revenue_view(request):
    period = request.query_params.get('period', 'daily')

    if period == 'daily':
        revenues = Revenue.objects.filter(date=date.today())
    elif period == 'monthly':
        start_date = date.today().replace(day=1)
        revenues = Revenue.objects.filter(date__gte=start_date)
    elif period == 'yearly':
        start_date = date.today().replace(month=1, day=1)
        revenues = Revenue.objects.filter(date__gte=start_date)
    else:
        return Response({"error": "Invalid period"}, status=400)

    total_revenue = revenues.aggregate(Sum('amount'))['amount__sum'] or 0
    return Response({"period": period, "total_revenue": total_revenue})


class RevenueViewSet(ModelViewSet):
    queryset = Revenue.objects.all()
    serializer_class = RevenueSerializer
