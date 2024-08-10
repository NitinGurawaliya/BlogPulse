-- CreateTable
CREATE TABLE "DislikedBlog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "DislikedBlog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DislikedBlog_userId_postId_key" ON "DislikedBlog"("userId", "postId");

-- AddForeignKey
ALTER TABLE "DislikedBlog" ADD CONSTRAINT "DislikedBlog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DislikedBlog" ADD CONSTRAINT "DislikedBlog_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
