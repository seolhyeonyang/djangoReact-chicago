from django.shortcuts import render

from django.http import HttpResponse, JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import MemberVO as member
from .serializers import MemberSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from icecream import ic


class Members(APIView):
    def post(self, request):
        data = request.data['body']
        ic(data)
        serializer = MemberSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'result': f'welcome, {serializer.data.get("name")}'}, status=201)
        ic(serializer.errors)
        return Response(serializer.errors, status=400)

class Member(APIView):
    def post(self, request):
        data = request.data['body']
        pk = data['username']
        pw = data['password']
        db_name = self.get_object(pk)
        if pw == db_name.password:
            return Response({'result':f'{pk}'}, status=201)
        return HttpResponse(status=104)

    @staticmethod
    def get_object(pk):
        try:
            return member.objects.get(pk=pk)
        except member.DoesNotExist:
            raise Http404



@csrf_exempt
def member_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = member.objects.all()
        serializer = MemberSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = MemberSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
