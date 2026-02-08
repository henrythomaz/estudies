my_list = ["Wall", "Floor", "Root", "Ceiling", "Wall", "Floor", "Root", "Ceiling"]

print(my_list)
print(my_list[2:])
print(my_list[:2])
print(my_list[1:2])
print(my_list[-1])
print(my_list[::2])
print(my_list[1:7:2])
print(my_list[::-1])

document = ["home", *my_list]

column = document[0]
rows = document[1:]
peace = "Wal"
test = peace in rows
test2 = peace not in rows

print(column)
print(rows)
print(f"{peace} is in my list: {test}")
print(f"{peace} is not in my list: {test2}")

print(len(my_list))
print(sorted(my_list))

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

print(sum(numbers))
print(min(numbers))
print(max(numbers))

# Methods

family = ["Father", "Mother", "Sister", "Brother"]

my_list.append("Door")
my_list.append("Window")
my_list.extend(family)
my_list.sort()
print(my_list)
print(my_list.count("Wall"))
my_list.insert(2, "Wall")
print(my_list)
my_list.remove("Wall")
print(my_list)

item = my_list.pop(2)

print(my_list)
print(item)

my_list.reverse()
print(my_list)

my_list.clear()
print(my_list)

my_list = ["Wall", "Floor", "Root", "Ceiling", "Wall", "Floor", "Root", "Ceiling"]

x = my_list
y = my_list.copy()

print(x)
print(y)

my_list.append("Item")

print(x)
print(y)

my_list[2] = "newItem"

print(my_list)

points = [
[0, 0, 0],
[1, 1, 1],
[2, 2, 2],
[3, 3, 3]
]

print(points[0])
print(points[0][0])

for i in my_list:
  print(i)