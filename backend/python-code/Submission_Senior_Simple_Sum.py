def add(a,b):
  #write your code here
  m=1
  while True:
    m+=1
  return a+b

a, b = map(int, input().split())
c = add(a,b)
print(c)