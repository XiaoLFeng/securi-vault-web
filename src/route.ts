import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import("@/views/auth/BaseAuth.vue")
        },
        {
            path: '/auth',
            name: 'BaseAuth',
            component: () => import("@/views/auth/BaseAuth.vue"),
            children: [
                {
                    path: 'login',
                    name: 'AuthLogin',
                    component: () => import("@/views/auth/AuthLogin.vue")
                },
                {
                    path: 'biometric',
                    name: 'AuthBiometricLogin',
                    component: () => import("@/views/auth/AuthBiometricLogin.vue")
                }
            ]
        }
    ]
})

export default router
