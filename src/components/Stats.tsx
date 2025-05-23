
const Stats = () => {
  const stats = [
    { number: "1200+", label: "Average Score Improvement", highlight: true },
    { number: "95%", label: "Student Satisfaction Rate" },
    { number: "50K+", label: "Questions Answered Daily" },
    { number: "99%", label: "Accuracy Rate on Practice Tests" }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Proven Results
          </h2>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto">
            Join thousands of students who have achieved their SAT goals with our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-4xl md:text-5xl font-bold mb-2 ${
                stat.highlight ? 'text-blue-600' : 'text-blue-900'
              }`}>
                {stat.number}
              </div>
              <div className="text-blue-700 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
