#ifndef SET_HPP_
#define SET_HPP_

template<typename T>
class Set {

public:
    Set() {}

    Set(const Set& rhs) {
        *this = rhs;
    }

    ~Set() {}

    unsigned int cardinality() {
        return size();
    }

    unsigned int size() {
        return container.size;
    }

    Set<T>& add(const T& element) {
        container.add(element);
        return *this;
    }

    Set<T>& operator = (const Set<T>& r) const {
        Node* i = r.container.head;
        container.empty();

        while(i != NULL) {
            container.add(i->value);
        }

        return *this;
    }

    Set<T> operator + (const Set<T>& r) const {
        Node* i = r.container.head;
        Set<T> unionSet = *this;

        while(i != NULL) {
            unionSet.container.add(i->value);
        }

        return unionSet;
    }

    Set<T> operator - (const Set<T>& r) const {
        Node* i = container.head;
        Set<T> differenceSet = *this;

        while(i != NULL) {

            if(r.contains(i->value)) {
                differenceSet.remove(i->value);
            }

            i = i->next;
        }

        return differenceSet;
    }

    Set<T> operator * (const Set<T>& r) const {
        Node* i = r.container.head;
        Set<T> intersectSet = *this + r;

        while(i != NULL) {

            if(!container.contains(i->value)) {
                intersectSet.remove(i->value);
            }
        }

        i = container.head;
        while(i != NULL) {

            if(!r.container.contains(i->value)) {
                intersectSet.remove(i->value);
            }
        }

        return intersectSet;
    }

    bool contains(const T& element) const {
        Node* i = container.head;

        while(i != NULL) {

            if(i->value == r) {
                return true;
            }
        }

        return false;
    }

    class iterator;

    iterator begin() {
        iterator b(*this);
        b.location = container.head;
        return b;
    }

    iterator end() {
        iterator e(*this);
        Node<T>* i = container.head;

        if(container.head == NULL) {
            e.location = NULL;
        } else {

            while(i->next != NULL) {
                i = i->next;
            }
            e.location = new Node<T>();
            e.location->previous = i;
        }
        return e;
    }

private:

    template<typename T>
    struct Node {
    public:
        Node<T>* next;
        Node<T>* previous;
        T value;

        Node<T>() : next(NULL), previous(NULL) {}
    };

    class iterator {

    public:

        iterator(Set<T>& p) : parent(&p) {}
        ~iterator() {}

	    T& operator*() const {
            return location->value;
        }

	    T* operator->() const {
		    return &location->value;
	    }

        bool operator == (const iterator& rhs) const {
            
            if(location->next == NULL && rhs.location->next == NULL) {
                return location->prev == rhs.location->prev;
            } else {
                return location == rhs.location;
            }
        }

        bool operator != (const iterator& rhs) const {
            return !(location == rhs.location);
        }

        iterator& operator ++ (int i) {
            Node<T>* prev = NULL;

            if(location != NULL) {
                location = location->next;
            }

            if(location == NULL && prev != NULL) {
                location = new Node<T>();
                location->previous = prev;
            }

            return *this;
        }

        iterator& operator -- (int i) {

            if(location != NULL) {
                location = location->previous;
            }

            return *this;
        }

        iterator& operator ++ () {
            return (*this)++;
        }

        iterator& operator -- () {
            return (*this)--;
        }

    private:
        friend class Set<T>;
        Node<T>* location;

        Set<T>* parent;
    };

    class List {
    public:
        List() : head(NULL), size(0) {}

        ~List() {
            empty();
        }

        void add(const T& element) {
            
            if(head == NULL) {
                head = new Node<T>();
                head->value = element;
                size = 1;
            } else {
                Node<T>* i = head;
                Node<T>* j = NULL;

                while(i != NULL) {

                    if(i->value == element) {
                        return;
                    } else {
                        j = i;
                        i = i->next;
                    }
                }

                j->next = new Node<T>();
                j->next->value = element;
                j->next->previous = j;
                size++;
            }
        }

        void remove(const T& element) {
            Node<T>* i = head;

            while(i->value != element) {
                i = i->next;
            }

            if(i->value == element) {
                size--;

                if(i == head) {
                    delete head;
                    head = NULL;
                } else {
                    Node<T>* nodeRemoved = i;
                    i = i->previous;
                    i->next = nodeRemoved->next;

                    if(nodeRemoved->next != NULL) {
                        nodeRemoved->next->previous = i;
                    }
                    delete nodeRemoved;
                }
            }
        }

        void empty() {
            Node<T>* current = head;
            size = 0;

            while(current != NULL) {
                Node<T>* next = current->next;
                delete current;
                current = next;
            }
        }

        Node<T>* head;
        unsigned int size;
    };

    List container;
};

#endif // SET_HPP_