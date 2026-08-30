-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'settings',
    "brandNameEn" TEXT NOT NULL DEFAULT 'PORT-4',
    "brandNameAr" TEXT NOT NULL DEFAULT 'PORT-4',
    "taglineEn" TEXT NOT NULL DEFAULT '',
    "taglineAr" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "locationEn" TEXT NOT NULL DEFAULT '',
    "locationAr" TEXT NOT NULL DEFAULT '',
    "heroHeadlineEn" TEXT NOT NULL DEFAULT '',
    "heroHeadlineAr" TEXT NOT NULL DEFAULT '',
    "heroAccentLine" INTEGER NOT NULL DEFAULT -1,
    "heroSubcopyEn" TEXT NOT NULL DEFAULT '',
    "heroSubcopyAr" TEXT NOT NULL DEFAULT '',
    "heroTrustTitleEn" TEXT NOT NULL DEFAULT '',
    "heroTrustTitleAr" TEXT NOT NULL DEFAULT '',
    "heroTrustSubEn" TEXT NOT NULL DEFAULT '',
    "heroTrustSubAr" TEXT NOT NULL DEFAULT '',
    "trustHeadingEn" TEXT NOT NULL DEFAULT '',
    "trustHeadingAr" TEXT NOT NULL DEFAULT '',
    "trustAccentLine" INTEGER NOT NULL DEFAULT -1,
    "trustBlurbEn" TEXT NOT NULL DEFAULT '',
    "trustBlurbAr" TEXT NOT NULL DEFAULT '',
    "aboutHeadingEn" TEXT NOT NULL DEFAULT '',
    "aboutHeadingAr" TEXT NOT NULL DEFAULT '',
    "aboutAccentLine" INTEGER NOT NULL DEFAULT -1,
    "aboutBodyEn" TEXT NOT NULL DEFAULT '',
    "aboutBodyAr" TEXT NOT NULL DEFAULT '',
    "aboutBodyTwoEn" TEXT NOT NULL DEFAULT '',
    "aboutBodyTwoAr" TEXT NOT NULL DEFAULT '',
    "aboutTopologyTitleEn" TEXT NOT NULL DEFAULT '',
    "aboutTopologyTitleAr" TEXT NOT NULL DEFAULT '',
    "aboutTopologySubEn" TEXT NOT NULL DEFAULT '',
    "aboutTopologySubAr" TEXT NOT NULL DEFAULT '',
    "aboutCoreLabelEn" TEXT NOT NULL DEFAULT '',
    "aboutCoreLabelAr" TEXT NOT NULL DEFAULT '',
    "servicesHeadingEn" TEXT NOT NULL DEFAULT '',
    "servicesHeadingAr" TEXT NOT NULL DEFAULT '',
    "servicesAccentLine" INTEGER NOT NULL DEFAULT -1,
    "processHeadingEn" TEXT NOT NULL DEFAULT '',
    "processHeadingAr" TEXT NOT NULL DEFAULT '',
    "processAccentLine" INTEGER NOT NULL DEFAULT -1,
    "processBlurbEn" TEXT NOT NULL DEFAULT '',
    "processBlurbAr" TEXT NOT NULL DEFAULT '',
    "projectsHeadingEn" TEXT NOT NULL DEFAULT '',
    "projectsHeadingAr" TEXT NOT NULL DEFAULT '',
    "projectsAccentLine" INTEGER NOT NULL DEFAULT -1,
    "projectsBlurbEn" TEXT NOT NULL DEFAULT '',
    "projectsBlurbAr" TEXT NOT NULL DEFAULT '',
    "partnersHeadingEn" TEXT NOT NULL DEFAULT '',
    "partnersHeadingAr" TEXT NOT NULL DEFAULT '',
    "partnersAccentLine" INTEGER NOT NULL DEFAULT -1,
    "contactHeadingEn" TEXT NOT NULL DEFAULT '',
    "contactHeadingAr" TEXT NOT NULL DEFAULT '',
    "contactAccentLine" INTEGER NOT NULL DEFAULT -1,
    "contactBlurbEn" TEXT NOT NULL DEFAULT '',
    "contactBlurbAr" TEXT NOT NULL DEFAULT '',
    "contactFormIntroEn" TEXT NOT NULL DEFAULT '',
    "contactFormIntroAr" TEXT NOT NULL DEFAULT '',
    "contactFormEncryptedEn" TEXT NOT NULL DEFAULT '',
    "contactFormEncryptedAr" TEXT NOT NULL DEFAULT '',
    "contactSubmitLabelEn" TEXT NOT NULL DEFAULT '',
    "contactSubmitLabelAr" TEXT NOT NULL DEFAULT '',
    "contactSubmitSendingEn" TEXT NOT NULL DEFAULT '',
    "contactSubmitSendingAr" TEXT NOT NULL DEFAULT '',
    "contactPrivacyNoteEn" TEXT NOT NULL DEFAULT '',
    "contactPrivacyNoteAr" TEXT NOT NULL DEFAULT '',
    "contactSuccessMessageEn" TEXT NOT NULL DEFAULT '',
    "contactSuccessMessageAr" TEXT NOT NULL DEFAULT '',
    "footerAboutBlurbEn" TEXT NOT NULL DEFAULT '',
    "footerAboutBlurbAr" TEXT NOT NULL DEFAULT '',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "NavItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "labelEn" TEXT NOT NULL,
    "labelAr" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "icon" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "labelAr" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "abbr" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "MarqueeItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "textEn" TEXT NOT NULL,
    "textAr" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Stat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "labelAr" TEXT NOT NULL,
    "hintEn" TEXT NOT NULL DEFAULT '',
    "hintAr" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "AboutBullet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "textEn" TEXT NOT NULL,
    "textAr" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "TeamRole" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roleEn" TEXT NOT NULL,
    "roleAr" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "noteEn" TEXT NOT NULL DEFAULT '',
    "noteAr" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "outcomes" TEXT NOT NULL DEFAULT '[]',
    "stack" TEXT NOT NULL DEFAULT '[]',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ProcessStep" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stepId" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "bodyEn" TEXT NOT NULL,
    "bodyAr" TEXT NOT NULL,
    "tokens" TEXT NOT NULL DEFAULT '[]',
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "indexLabel" TEXT NOT NULL DEFAULT '',
    "year" TEXT NOT NULL DEFAULT '',
    "nameEn" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "categoryEn" TEXT NOT NULL DEFAULT '',
    "categoryAr" TEXT NOT NULL DEFAULT '',
    "summaryEn" TEXT NOT NULL DEFAULT '',
    "summaryAr" TEXT NOT NULL DEFAULT '',
    "resultEn" TEXT NOT NULL DEFAULT '',
    "resultAr" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL DEFAULT '',
    "stack" TEXT NOT NULL DEFAULT '[]',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nameEn" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "logo" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "ProjectType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "labelEn" TEXT NOT NULL,
    "labelAr" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "BudgetRange" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "businessName" TEXT NOT NULL,
    "businessType" TEXT NOT NULL DEFAULT '',
    "contactEmail" TEXT NOT NULL DEFAULT '',
    "contactPhone" TEXT NOT NULL DEFAULT '',
    "contactWhatsapp" TEXT NOT NULL DEFAULT '',
    "primaryGoal" TEXT NOT NULL DEFAULT '',
    "locale" TEXT NOT NULL DEFAULT 'en',
    "status" TEXT NOT NULL DEFAULT 'new',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "data" TEXT NOT NULL,
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SubmissionFile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "submissionId" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SubmissionFile_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT NOT NULL DEFAULT '',
    "projectType" TEXT NOT NULL DEFAULT '',
    "budget" TEXT NOT NULL DEFAULT '',
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "NavItem_order_idx" ON "NavItem"("order");

-- CreateIndex
CREATE INDEX "SocialLink_order_idx" ON "SocialLink"("order");

-- CreateIndex
CREATE INDEX "MarqueeItem_order_idx" ON "MarqueeItem"("order");

-- CreateIndex
CREATE INDEX "Stat_order_idx" ON "Stat"("order");

-- CreateIndex
CREATE INDEX "AboutBullet_order_idx" ON "AboutBullet"("order");

-- CreateIndex
CREATE INDEX "TeamRole_order_idx" ON "TeamRole"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE INDEX "Service_order_idx" ON "Service"("order");

-- CreateIndex
CREATE INDEX "ProcessStep_order_idx" ON "ProcessStep"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Project_order_idx" ON "Project"("order");

-- CreateIndex
CREATE INDEX "Partner_order_idx" ON "Partner"("order");

-- CreateIndex
CREATE INDEX "ProjectType_order_idx" ON "ProjectType"("order");

-- CreateIndex
CREATE INDEX "BudgetRange_order_idx" ON "BudgetRange"("order");

-- CreateIndex
CREATE INDEX "Submission_status_idx" ON "Submission"("status");

-- CreateIndex
CREATE INDEX "Submission_submittedAt_idx" ON "Submission"("submittedAt");

-- CreateIndex
CREATE INDEX "SubmissionFile_submissionId_idx" ON "SubmissionFile"("submissionId");

-- CreateIndex
CREATE INDEX "Inquiry_status_idx" ON "Inquiry"("status");

-- CreateIndex
CREATE INDEX "Inquiry_createdAt_idx" ON "Inquiry"("createdAt");
