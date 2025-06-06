import DashboardLayout from "@/components/layouts/DashboardLayout";
import Category from "@/components/views/Admin/Category";
import AddCategoryModal from "@/components/views/Admin/Category/AddCategoryModal";

const AdminCategoryPage = () =>{
    return (
        <DashboardLayout 
        title="Category" 
        description="List of all Categories, create new Category, and manage existing Categories" 
        type="admin">
            <Category />
            
        </DashboardLayout>
    )
}

export default AdminCategoryPage;