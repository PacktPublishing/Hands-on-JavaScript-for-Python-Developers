from django.http import HttpResponse
from django.template import Context, loader
from bot.models import Text
import random
import json
from django.shortcuts import render


def index(request):
    return render(request, "../react-frontend/build/index.html")


def api(request):
    if request.method == 'POST':
        query = json.loads(request.body)['chattext']
        responses = Text.objects.filter(PlayerLine__contains=" %s " % (query))

        if len(responses) > 0:
            return HttpResponse(responses[random.randint(0, len(responses))])
        else:
            return HttpResponse("Get thee to a nunnery!")
