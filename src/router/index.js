import VueRouter from 'vue-router'
import Vue from 'vue'
import Customer from "../page/customer/CustomerList"
import Employee from "../page/employee/EmployeeList"

Vue.use(VueRouter)

const routes = [
    {
        path: "/employee",
        name: "employee",
        component: Employee
    },
    {
        path: "/customer",
        name: "customer",
        component: Customer
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router