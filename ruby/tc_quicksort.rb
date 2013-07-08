# File:  tc_simple_number.rb
 
require "./quicksort"
require "test/unit"

# ruby tc_quicksort.rb
class TestSimpleNumber < Test::Unit::TestCase
 
  def test_swap
    assert_equal(swap!([1,2,3], 0, 2), [3,2,1] )
  end
 
  def test_partition
    l = [5,1,2,6,3,7]
    partition!(l, 0, 5, 0)
    assert_equal(l, [3, 1, 2, 5, 7, 6])
  end
  
  def test_quick_sort
    l = [5,1,2,6,3,7]
    quick_sort!(l)
    assert_equal(l, [1, 2, 3, 5, 6, 7])
  end
  
  def test_quick_sort_short
    l = [5,1,2,6,3,7]
    quick_sort_short(l)
    assert_equal(l, [1, 2, 3, 5, 6, 7])
  end
end