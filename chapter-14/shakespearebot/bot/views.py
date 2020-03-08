from django.http import HttpResponse
from django.template import Context, loader
from bot.models import Text
import random
import json


def index(request):
    template = loader.get_template("bot/index.html")

    return HttpResponse(template.render())


def api(request):
    if request.method == 'POST':
        query = json.loads(request.body)['chattext']
        responses = Text.objects.filter(PlayerLine__contains=" %s " % (query))

        if len(responses) > 0:
            return HttpResponse(responses[random.randint(0, len(responses))])
        else:
            return HttpResponse("Get thee to a nunnery!")
