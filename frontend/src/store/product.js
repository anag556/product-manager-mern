import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    // create product
    createProduct: async(newProduct) => {
        if(!newProduct.name || !newProduct.image || !newProduct.price){
            return {success: false, message:"Please fill all fields."}
        }
        const res = await fetch("/api/products", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        });
        const data = await res.json();
        set((state) => ({products:[...state.products, data.data]}))
        return {success:true, message:"Product Created Successfully."}
    },
    // get all products data
    fetchProducts: async () => {
        const res = await fetch("api/products");
        const data = await res.json();
        set({products: data.data});
    },
    // delete a product
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`,{
            method:"DELETE",
        });
        const data = await res.json();
        if(!data.success) return {success:false, message: data.message};

        // update the UI after deleting
        set(state => ({products: state.products.filter(product => product._id !== pid)}));
        return {success: true, message: data.message};
    },
    // update a product
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};

        //update UI without refresh
        set(state=>({
            products: state.products.map((product) => (product._id === pid ? data.data : product)),
        }));

        return {success: true, message: data.message};
    }
}));

