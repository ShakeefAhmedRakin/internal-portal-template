# 🏢 Internal Portal Template

A production-ready template for building **admin-controlled internal portals** and **B2B SaaS applications**. Perfect for enterprise tools, internal dashboards, client portals, and admin-managed user systems.

> **Built with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack)** - A modern TypeScript stack combining Next.js, oRPC, and more.

## 🎯 What This Template Provides

### **Admin-Controlled User Management**

- ✅ Admin creates and manages user accounts
- ✅ No public sign-up (admin-controlled access)
- ✅ User authentication and session management
- ✅ Role-based access control ready

### **Enterprise-Ready Features**

- 🔐 Secure authentication with Better Auth
- 🎨 Modern UI with shadcn/ui components
- 📱 Responsive design (mobile + desktop)
- 🌙 Dark/Light theme support
- ⚡ Type-safe APIs with oRPC
- 🗄️ Database migrations and schema management

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm package manager

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd internal-portal-template
pnpm install
```

### 2. Environment Setup

Create environment files:

**`packages/api/.env`**

```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"
CORS_ORIGIN="http://localhost:3001"
```

**`apps/web/.env.local`**

```env
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Push schema to database
pnpm db:push

# (Optional) Open database studio
pnpm db:studio
```

### 4. Start Development

```bash
# Start all services
pnpm dev

# Or start individually
pnpm dev:web    # Frontend only
pnpm dev:server # API only
```

### 5. Access the Application

- **Frontend**: [http://localhost:3001](http://localhost:3001)

## 🏗️ Architecture

```
internal-portal-template/
├── apps/
│   └── web/                    # Next.js frontend
│       ├── src/app/
│       │   ├── (auth)/         # Authentication pages
│       │   └── (dashboard)/    # Protected dashboard
│       └── src/components/     # Reusable UI components
└── packages/
    └── api/                    # oRPC backend API
        ├── src/modules/        # Feature modules
        └── src/lib/           # Shared utilities
```

## 🛠️ Tech Stack

| Category           | Technology           | Purpose                         |
| ------------------ | -------------------- | ------------------------------- |
| **Frontend**       | Next.js 15           | React framework with App Router |
| **Styling**        | Tailwind CSS v4      | Utility-first CSS framework     |
| **UI Components**  | shadcn/ui            | Pre-built accessible components |
| **Backend**        | oRPC                 | Type-safe API with OpenAPI      |
| **Database**       | PostgreSQL + Drizzle | Type-safe database operations   |
| **Authentication** | Better Auth          | Secure auth with sessions       |
| **Monorepo**       | Turborepo            | Optimized build system          |
| **Language**       | TypeScript           | End-to-end type safety          |

## 📋 Available Scripts

| Command            | Description                           |
| ------------------ | ------------------------------------- |
| `pnpm dev`         | Start all applications in development |
| `pnpm build`       | Build all applications for production |
| `pnpm dev:web`     | Start only the frontend application   |
| `pnpm dev:server`  | Start only the API server             |
| `pnpm check-types` | Run TypeScript type checking          |
| `pnpm db:push`     | Push database schema changes          |
| `pnpm db:studio`   | Open Drizzle Studio (database UI)     |
| `pnpm db:generate` | Generate database migrations          |
| `pnpm format`      | Format code with Prettier             |

## 🎨 Customization Guide

### **Branding & Theming**

- Update `apps/web/src/components/branding/app-logo.tsx` for your logo
- Modify colors in `apps/web/src/index.css` CSS variables
- Update metadata in `apps/web/src/app/layout.tsx`

### **Authentication**

- Configure auth settings in `packages/api/src/modules/auth/`
- Customize email templates in `packages/api/src/modules/auth/templates/`
- Add OAuth providers in Better Auth configuration

### **Database Schema**

- Modify schemas in `packages/api/src/lib/db.ts`
- Run `pnpm db:generate` after schema changes
- Apply changes with `pnpm db:push`

### **API Routes**

- Add new endpoints in `packages/api/src/modules/`
- Update routers in `packages/api/src/modules/routers.ts`

## 🔧 Configuration

### **Environment Variables**

See `.env.example` files in each package for required environment variables.

### **Database**

- Supports PostgreSQL (recommended)
- Schema managed with Drizzle ORM
- Migrations included for user management

### **Authentication**

- Email/password authentication
- Session-based auth with Better Auth
- Ready for OAuth providers (Google, GitHub, etc.)

## 📚 Use Cases

This template is perfect for:

- **🏢 Internal Company Tools** - Employee dashboards, admin panels
- **🤝 Client Portals** - Customer-facing admin-controlled access
- **🔧 B2B SaaS Applications** - Multi-tenant admin-managed systems
- **📊 Enterprise Dashboards** - Data visualization and management tools
- **👥 Team Management Systems** - User provisioning and access control

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Authentication by [Better Auth](https://www.better-auth.com/)

---

**Ready to build your internal portal?** 🚀 Clone this template and start customizing!
