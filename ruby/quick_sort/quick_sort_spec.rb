require_relative 'quick_sort'

describe QuickSort do
  let(:a) { [5,1,4,2,3] }
  let(:expected) { [1,2,3,4,5] }

  describe 'partition' do

    it {
      QuickSort.partition(a, 3).should ==
      [[1, 2],[3],[5, 4]] }

    it {
      QuickSort.partition([], 3).should ==
      [[],[],[]] }

  end

  describe 'sorting' do
    subject { QuickSort.sort(a) }
    it { should eq expected }
  end
end
