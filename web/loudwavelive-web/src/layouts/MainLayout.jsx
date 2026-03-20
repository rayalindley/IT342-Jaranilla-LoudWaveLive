import Header from "../components/Header";

export default function MainLayout({ children }) {
    const isLoggedIn = true;

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <main>
                {children}
            </main>
        </>
    )
}