def density(self, N,  par):
    # code here
    #  define the total number of nodes in the tree
    N = len(par)
    # a list to represent the trees
    list_v = [[] for _ in range(N)]
    for i in range(N):
        if par[i] != -1:
            list_v[par[i]].append(i)

    # calculate the size of tree rooted at root
    def calculate_size(root):
        size = 1  # root node
        for child in list_v[root]:
            size += calculate_size(child)
            return size
        # calculate height at root

        def calculate_height(root):
            if not list_v[root]:
                return 0
            max_height = 0
            for child in list_v[root]:
                max_height = max(max_height, calculate_height(child))
                return max_height+1
            size = calculate_size(0)
            height = calculate_height(0)
            density = size/height
            return round(density, 6)
