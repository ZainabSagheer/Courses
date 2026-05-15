export async function generateStaticParams() {
  const { courses } = await import('@/lib/data');
  return courses.map((course) => ({
    id: course.id.toString(),
  }));
}

export default function DashboardCourseLayout({ children }) {
  return children;
}
