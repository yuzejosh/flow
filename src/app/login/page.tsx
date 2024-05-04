const LoginPage = () => {
    console.log(process.env.AUTH0_SECRET);


    return (
        <div>
            <a href="/api/auth/login">Login</a>
        </div>
    );
}

export default LoginPage;