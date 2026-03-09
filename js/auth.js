function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    if (user === "admin" && pass === "admin123") {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html";
    } else { alert("❌ Invalid credentials!"); }
}
if (window.location.pathname.includes("index.html")) {
    if (localStorage.getItem("isLoggedIn") !== "true") { window.location.href = "login.html"; }
}