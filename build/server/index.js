import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const login = UNSAFE_withComponentProps(function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const supabaseUrl = "https://lrcjmzkiylrxhzqopzaz.supabase.co";
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyY2ptemtpeWxyeGh6cW9wemF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMDA1ODgsImV4cCI6MjA2ODY3NjU4OH0.RqzIQRaR7CAZxHZLsCP-ARf9mKAFNwS-U0Y4Qt7FEGY";
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const {
        data,
        error
      } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password
      });
      if (error) {
        setMessage(error.message || "Login failed.");
      } else if (data && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage("Login successful!");
        navigate("/home");
      } else {
        setMessage("Login failed.");
      }
    } catch (err) {
      setMessage("Error connecting to Supabase.");
    }
  };
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-md w-full space-y-8",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsxs("h1", {
          className: "text-center text-4xl font-bold text-gray-900",
          children: [/* @__PURE__ */ jsx("span", {
            className: "text-blue-600",
            children: "Auto"
          }), "Care Pro"]
        }), /* @__PURE__ */ jsx("h2", {
          className: "mt-6 text-center text-3xl font-extrabold text-gray-900",
          children: "Sign in to your account"
        })]
      }), /* @__PURE__ */ jsxs("form", {
        className: "mt-8 space-y-6",
        onSubmit: handleSubmit,
        children: [/* @__PURE__ */ jsxs("div", {
          className: "rounded-md shadow-sm -space-y-px",
          children: [/* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx("input", {
              name: "email",
              type: "email",
              required: true,
              className: "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm",
              placeholder: "Email address",
              value: form.email,
              onChange: handleChange
            })
          }), /* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx("input", {
              name: "password",
              type: "password",
              required: true,
              className: "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm",
              placeholder: "Password",
              value: form.password,
              onChange: handleChange
            })
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col space-y-4",
          children: [/* @__PURE__ */ jsx("button", {
            type: "submit",
            className: "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
            children: "Sign in"
          }), /* @__PURE__ */ jsx(Link, {
            to: "/register",
            className: "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500",
            children: "Register new account"
          })]
        })]
      }), message && /* @__PURE__ */ jsx("div", {
        className: `mt-2 text-center text-sm ${message.includes("Error") || message.includes("failed") ? "text-red-600" : "text-green-600"}`,
        children: message
      })]
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: login
}, Symbol.toStringTag, { value: "Module" }));
function Welcome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/");
    }
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50", children: [
    /* @__PURE__ */ jsxs("nav", { className: "bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50", children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center h-16", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold text-gray-900", children: [
          /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "Auto" }),
          "Care Pro"
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsxs("div", { className: "ml-10 flex items-baseline space-x-8", children: [
          /* @__PURE__ */ jsx("a", { href: "#home", className: "text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors", children: "Home" }),
          /* @__PURE__ */ jsx("a", { href: "#services", className: "text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors", children: "Services" }),
          /* @__PURE__ */ jsx("a", { href: "#about", className: "text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors", children: "About" }),
          /* @__PURE__ */ jsx("a", { href: "#contact", className: "text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors", children: "Contact" }),
          user && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("span", { className: "text-gray-900 px-3 py-2 text-sm font-medium", children: [
              "Welcome, ",
              user.username,
              "!"
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleLogout,
                className: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                children: "Logout"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("button", { className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors", children: "Book Service" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsMenuOpen(!isMenuOpen),
            className: "text-gray-900 hover:text-blue-600 p-2",
            children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })
          }
        ) })
      ] }) }),
      isMenuOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden bg-white border-t border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "px-2 pt-2 pb-3 space-y-1", children: [
        /* @__PURE__ */ jsx("a", { href: "#home", className: "block px-3 py-2 text-gray-900 hover:text-blue-600 text-sm font-medium", children: "Home" }),
        /* @__PURE__ */ jsx("a", { href: "#services", className: "block px-3 py-2 text-gray-900 hover:text-blue-600 text-sm font-medium", children: "Services" }),
        /* @__PURE__ */ jsx("a", { href: "#about", className: "block px-3 py-2 text-gray-900 hover:text-blue-600 text-sm font-medium", children: "About" }),
        /* @__PURE__ */ jsx("a", { href: "#contact", className: "block px-3 py-2 text-gray-900 hover:text-blue-600 text-sm font-medium", children: "Contact" }),
        user && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("span", { className: "block px-3 py-2 text-gray-900 text-sm font-medium", children: [
            "Welcome, ",
            user.username,
            "!"
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleLogout,
              className: "w-full mt-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium",
              children: "Logout"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("button", { className: "w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium", children: "Book Service" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold text-gray-900 sm:text-4xl", children: "Welcome to AutoCare Pro" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-xl text-gray-600", children: "Your trusted partner for all automotive needs" })
    ] }) })
  ] });
}
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    }
  }, [navigate]);
  return /* @__PURE__ */ jsx(Fragment, { children });
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(ProtectedRoute, {
    children: /* @__PURE__ */ jsx(Welcome, {})
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const register = UNSAFE_withComponentProps(function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) setMessage("Registration successful!");
      else setMessage(data.error || "Registration failed.");
    } catch (err) {
      setMessage("Error connecting to server.");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("h2", {
      children: "Register"
    }), /* @__PURE__ */ jsxs("form", {
      onSubmit: handleSubmit,
      children: [/* @__PURE__ */ jsx("input", {
        name: "username",
        placeholder: "Username",
        value: form.username,
        onChange: handleChange,
        required: true
      }), /* @__PURE__ */ jsx("input", {
        name: "email",
        type: "email",
        placeholder: "Email",
        value: form.email,
        onChange: handleChange,
        required: true
      }), /* @__PURE__ */ jsx("input", {
        name: "password",
        type: "password",
        placeholder: "Password",
        value: form.password,
        onChange: handleChange,
        required: true
      }), /* @__PURE__ */ jsx("button", {
        type: "submit",
        children: "Register"
      })]
    }), message && /* @__PURE__ */ jsx("p", {
      children: message
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: register
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-g5HDvKiO.js", "imports": ["/assets/chunk-EF7DTUVF-D2ElF7Tq.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-B5RrDXFz.js", "imports": ["/assets/chunk-EF7DTUVF-D2ElF7Tq.js"], "css": ["/assets/root-xwpmPkd9.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "login-page": { "id": "login-page", "parentId": "root", "path": "/", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/login-BbHrmS1H.js", "imports": ["/assets/chunk-EF7DTUVF-D2ElF7Tq.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": "/home", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-Dgsr6olj.js", "imports": ["/assets/chunk-EF7DTUVF-D2ElF7Tq.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/register": { "id": "routes/register", "parentId": "root", "path": "/register", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/register-BVjnaZHW.js", "imports": ["/assets/chunk-EF7DTUVF-D2ElF7Tq.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-8fcbf5bc.js", "version": "8fcbf5bc", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "login-page": {
    id: "login-page",
    parentId: "root",
    path: "/",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: "/home",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/register": {
    id: "routes/register",
    parentId: "root",
    path: "/register",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
