import lmstudio as lms

model = lms.llm("granite-3.3-8b-instruct")

result = model.respond('Generate Person')
print(result)

