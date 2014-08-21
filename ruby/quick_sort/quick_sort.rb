class QuickSort
  def self.sort(a)
    if p = random_pivot(a)
      split_array = partition(a, p)

      sort(split_array[0]) + split_array[1] + sort(split_array[2])
    else
      []
    end
  end

  def self.random_pivot(a)
    if a && a.count > 0
      a[rand(a.count)]
    end
  end

  def self.partition(a, p)
    res = a.reduce([[], [], []]) do |result, item|
      if item < p
        result[0] += [item]
      elsif item == p
        result[1] += [item]
      else
        result[2] += [item]
      end

      result
    end
  end
end
