const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Ensure default organization exists
  let org = await prisma.organization.findFirst()
  if (!org) {
    org = await prisma.organization.create({ data: { name: 'Default Org' } })
    console.log('Created default Organization')
  }

  // Seed sample client if none
  const clientCount = await prisma.client.count()
  if (clientCount === 0) {
    await prisma.client.create({
      data: {
        orgId: org.id,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1-555-0101',
        riskProfile: 'moderate',
        kycStatus: 'verified',
      },
    })
    console.log('Seeded sample client')
  }

  // Seed posts if none
  const postCount = await prisma.post.count()
  if (postCount === 0) {
    await prisma.post.createMany({
      data: [
        { title: 'Welcome to the blog', content: 'This is a seeded post.' },
        { title: 'Second post', content: 'Another seeded entry.' }
      ]
    })
    console.log('Seeded sample posts')
  } else {
    console.log(`Skipping posts seed, ${postCount} posts already exist`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
