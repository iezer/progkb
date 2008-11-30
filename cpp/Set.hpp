#ifndef SET_HPP_
#define SET_HPP_

template<typename T>
class Set {

private:
public:
	Node<T> array[];
	int size;
	
	Set() {size = 0;}
    ~Set() {}

    Set<T>& add(const T& element) {
		Node<T> current = Node(element);

		if (size == 0) {
			array = Node<T>[1];
			array [0] = element;
			size = 1;

		} else {
			int i = 0;
			while (i < size && array[i] < current){
				i++;
			} 
			// a[j] >= i
			
			// avoid duplicates
			if (i < size && array [i] == current) {
				return;
			}
			
			Node<T> new_array [size+1];
			memcpy (array, new_array, i*sizeof(Node<T>));
			new_array[i] = current;
			memcpy (array + i*sizeof(Node<T>), new_array + (i + 1)*sizeof(Node<T>), (size - i) * sizeof(Node<T>));


			free (array);
			array = new_array;
			size++;
		}
        return *this;
    }

	template<typename T>
    class Node {
    public:
        
        T value;

		Node<T>(T a) { value = a; }

		int operator< (Node<T>& rhs) {
			char* a = value;
			char* b = rhs;
			for (int i = 0; i <= sizeof(T)/sizeof(char); i++) {
				if (a[i] < b[i]) {
					return 1;
				} else if (a[i] > b[i]) {
					return 0;
				}
			}
			return 0;
		}

		int operator== (Node<T>& rhs) {
			char* a = value;
			char* b = rhs;

			for (int i = 0; i <= sizeof(T)/sizeof(char); i++) {
				if (a[i] != b[i]) {
					return 0;
				}
				return 1;
			}
		}
    };
};

#endif // SET_HPP_