from django.db import models

# Create your models here.

class Question(models.Model):
    question = models.CharField(max_length=100)
    
class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    xp = models.IntegerField(default=0)
    level = models.IntegerField(default=0)

    question_answered = models.ManyToManyField(Question)
    questions_incorrect = models.ManyToManyField(Question)
    questions_correct = models.ManyToManyField(Question)
    questions_pased = models.ManyToManyField(Question)


class Task(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    xp = models.IntegerField(default=0)
    level = models.IntegerField(default=0)
    difuculty = models.IntegerField(default='Easy')
    n_questions = models.IntegerField(default='Easy')
    questions = models.ManyToManyField(Question)

    wrong_answer = models.IntegerField(default=0)



class Alternative(models.Model):
    answer = models.CharField(max_length=100)
    isCorrect = models.BooleanField(default=False)

class AlternativeQuestion(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    alternatives = models.ManyToManyField(Alternative)
    difficulty = models.IntegerField(default=0)

class NumericQuestion(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.IntegerField(default=0)
    difficulty = models.IntegerField(default='Easy')
    



