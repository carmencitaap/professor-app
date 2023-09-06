from django.db import models

# Create your models here.

class Question(models.Model):
    TYPE_CHOICES = (
        ('MC', 'Multiple Choice'),
        ('N', 'Numeric'),
    )

    question = models.CharField(max_length=100)
    type_question = models.CharField(max_length=100, choices=TYPE_CHOICES)
    difficulty = models.IntegerField(default='Easy')

class Alternative(models.Model):
    question = models.ForeignKey(Question, max_length=5, on_delete=models.CASCADE)
    answer = models.CharField(max_length=100)
    isCorrect = models.BooleanField(default=False)


class AlternativeQuestion(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    alternatives = models.ManyToManyField(Alternative)
    

class NumericQuestion(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.IntegerField(default=0)
    

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

    @property
    def get_level(self):
        return self.level
    
    @property
    def get_xp(self):
        return self.xp


class Task(models.Model):
    name = models.TextField()
    description = models.CharField(max_length=100)

    xp = models.IntegerField(default=0)
    level = models.IntegerField(default=0)
    difuculty = models.IntegerField(default='Easy')
    questions = models.ManyToManyField(Question)

    wrong_answer = models.IntegerField(default=0)

    @property
    def n_questions(self):
        return self.questions.count()
    
    @property
    def n_correct(self):
        return self.questions_correct.count()







