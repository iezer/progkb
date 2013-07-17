import random

function swap (list, i j):
	list[i], list[j] = list[j], list[i]

#put the pivot in the right place and return its index
function partition (list, left, right, pivot):
	pivot_value = list[pivot]
	swap (list, pivot, right) 
	store_index = left
	for i in range (left, right - 1):
		if list[i] <= pivot_value:
			swap (list, i, store_index)
			store_index++
	swap (list, store_index, right)
	return store_index

function quick_sort (list, left, right):
	if left < right:
		pivot = random.randint(left, right)
		new_pivot_index = partition (list, left, right, pivot)
		quick_sort (list, left, new_pivot_index - 1)
		quick_sort (list, new_pivot_index + 1, right)

function quick_sort (list):
	quick_sort (list, 0, len(list) - 1)