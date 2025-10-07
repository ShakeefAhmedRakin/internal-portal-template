# 🏢 Internal Portal Template ( WORK IN PROGRESS )

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
- PostgreSQL database (local for dev, [Neon](https://neon.tech) recommended for production)
- pnpm package manager

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd internal-portal-template
pnpm install
```

### 2. Environment Setup

Create environment files:

**`packages/api/.env.development`**

```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
```

**`packages/api/.env.production`**

```env
DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"
```

> **💡 Database Strategy**:
>
> - **Development**: Uses `node-postgres` for local PostgreSQL connections
> - **Production**: Uses Neon's serverless driver for optimal serverless performance
> - The driver automatically switches based on `NODE_ENV`

**`apps/web/.env.local`** (Development)

```env
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3001"
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
CORS_ORIGIN="http://localhost:3001"
```

**`apps/web/.env.production`** (Production)

```env
BETTER_AUTH_SECRET="your-production-secret-key-here"
BETTER_AUTH_URL="https://your-production-frontend.com"
NEXT_PUBLIC_SERVER_URL="https://your-production-api.com"
CORS_ORIGIN="https://your-production-frontend.com"
```

### 3. Database Setup

**For Local Development (PostgreSQL):**

```bash
# Push schema to local database
pnpm db:dev:push

# Open database studio for local database
pnpm db:dev:studio
```

**For Production (Neon):**

```bash
# Push schema to Neon database
pnpm db:prod:push

# Open database studio for Neon database
pnpm db:prod:studio
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

## 🚀 Deploying to Production with Neon

### Step 1: Create a Neon Database

1. Sign up at [https://neon.tech](https://neon.tech)
2. Create a new project
3. Copy your connection string (format: `postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`)

### Step 2: Set Production Environment Variables

**`packages/api/.env.production`**

```env
DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"
```

**`apps/web/.env.production`**

```env
BETTER_AUTH_SECRET="your-production-secret"
BETTER_AUTH_URL="https://your-production-frontend.com"
NEXT_PUBLIC_SERVER_URL="https://your-production-api.com"
CORS_ORIGIN="https://your-production-frontend.com"
```

### Step 3: Push Schema to Neon

```bash
# Push your database schema to Neon
pnpm db:prod:push
```

That's it! Your production database is now hosted on Neon. 🎉

> **Note**: The application automatically uses the Neon serverless driver in production for optimal performance.

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

| Command                 | Description                                 |
| ----------------------- | ------------------------------------------- |
| `pnpm dev`              | Start all applications in development       |
| `pnpm build`            | Build all applications for production       |
| `pnpm dev:web`          | Start only the frontend application         |
| `pnpm dev:server`       | Start only the API server                   |
| `pnpm check-types`      | Run TypeScript type checking                |
| **Development DB:**     |                                             |
| `pnpm db:dev:push`      | Push schema to local PostgreSQL database    |
| `pnpm db:dev:studio`    | Open Drizzle Studio for local database      |
| `pnpm db:dev:generate`  | Generate migrations for local database      |
| `pnpm db:dev:migrate`   | Run migrations on local database            |
| **Production DB:**      |                                             |
| `pnpm db:prod:push`     | Push schema to Neon production database     |
| `pnpm db:prod:studio`   | Open Drizzle Studio for Neon database       |
| `pnpm db:prod:generate` | Generate migrations for production database |
| `pnpm db:prod:migrate`  | Run migrations on Neon production database  |
| `pnpm format`           | Format code with Prettier                   |

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
- Optimized for [Neon](https://neon.tech) serverless PostgreSQL
- Schema managed with Drizzle ORM
- Migrations included for user management
- Environment-specific database URLs (dev/prod)

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
