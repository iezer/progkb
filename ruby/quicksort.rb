
  def swap!(l,a,b)
    l[a], l[b] = l[b], l[a]
    l
  end
  
  def partition! (a, left, right, pivot)
    back = right - 1
    pivot_value = a[pivot]
    swap!(a, pivot, right)
    while left < back + 1
      if a[left] > pivot_value
        swap!(a, left, back)
        back -= 1
      else
        left += 1
      end
    end
    swap!(a, left, right)
    return left
  end
  
  def quick_sort_impl! (a, left, right)
    if (left >= right)
      return
    end
    
    pivot = rand(right - left + 1) + left
    new_pivot_position = partition!(a, left, right, pivot)
    quick_sort_impl!(a, left, new_pivot_position - 1)
    quick_sort_impl!(a, new_pivot_position + 1, right)
    return a
  end
  
  def quick_sort! (a)
    quick_sort_impl!(a, 0, a.length - 1)
  end
  
  def quick_sort_short a
    print a
    (pivot = a.pop) ? quick_sort_short(a.select{|i| i <= pivot}) + [pivot] + quick_sort_short(a.select{|i| i > pivot}) : []
  end
