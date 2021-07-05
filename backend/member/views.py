from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse, HttpResponse
from rest_framework import status
from rest_framework.response import Response
from member.models import MemberVO
from member.serializers import MemberSerializer
from rest_framework.decorators import api_view, parser_classes
from icecream import ic
from rest_framework import serializers


@api_view(['GET', 'POST', 'DELETE'])
@parser_classes([JSONParser])
def members(request):
    print('=== 여기까지는 왔다 !! ')
    if request.method == 'GET':
        all_members = MemberVO.objects.all()
        serializer = MemberSerializer(all_members, many=True)
        return JsonResponse(data=serializer.data, safe=False)
    elif request.method == 'POST':
        new_member = request.data['body']
        ic(new_member)
        serializer = MemberSerializer(data = new_member)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'result':f'Welcome, {serializer.data.get("name")}'}, status=201)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        serializer = MemberSerializer()
        return JsonResponse(serializer.data, safe=False)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def member(request):
    if request.method == 'GET':
        serializer = MemberSerializer()
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = request.data['body']
        pk = data['username']
        user_input_password = data['password']
        print(f'----------- ok 아이디 :  ------------- {pk}')
        print(f'----------- ok 비밀번호 :  ------------- {user_input_password}')
        member = MemberVO.objects.get(pk=pk)
        # member = self.get_object(pk)
        try:
            ic(member)
            print('----------- ok 1-------------')
            if user_input_password == member.password:
                print('----------- ok 2-------------')
                serializer = MemberSerializer(member, many=False)
                return JsonResponse(data=serializer.data, safe=False)
                # return JsonResponse({'result': json.dump(member)}, status=201)
        except member.DoesNotExist:
            print('해당 아이디가 없음')
            JsonResponse({'result': "FAIL"}, status=201)

        print('----------- ok 3-------------')
        return HttpResponse(status=104)
    elif request.method == 'PUT':
        serializer = MemberSerializer()
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'DELETE':
        serializer = MemberSerializer()
        return JsonResponse(serializer.data, safe=False)