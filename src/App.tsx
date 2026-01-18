import { useState } from 'react'
import { Menu, X, Search, Home, BookOpen, Mail, BarChart3, Users, Settings, HelpCircle, FileText, Printer } from 'lucide-react'

interface Section {
  id: string
  title: string
  icon: React.ReactNode
}

const sections: Section[] = [
  { id: 'introduction', title: 'Introduction', icon: <Home size={18} /> },
  { id: 'getting-started', title: 'Getting Started', icon: <BookOpen size={18} /> },
  { id: 'dashboard', title: 'Dashboard Overview', icon: <BarChart3 size={18} /> },
  { id: 'lead-generation', title: 'Lead Generation', icon: <Users size={18} /> },
  { id: 'email-outreach', title: 'Email Outreach', icon: <Mail size={18} /> },
  { id: 'pipeline', title: 'Pipeline Management', icon: <Settings size={18} /> },
  { id: 'analytics', title: 'Analytics & Reporting', icon: <BarChart3 size={18} /> },
  { id: 'best-practices', title: 'Best Practices', icon: <FileText size={18} /> },
  { id: 'troubleshooting', title: 'Troubleshooting', icon: <HelpCircle size={18} /> },
  { id: 'quick-reference', title: 'Quick Reference', icon: <FileText size={18} /> },
]

function App() {
  const [activeSection, setActiveSection] = useState('introduction')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-72' : 'w-0'
        } bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <img src="/images/ezmedtech-logo.jpg" alt="Ezmedtech" className="h-10 w-auto" />
            <div>
              <h2 className="text-lg font-bold text-gray-900 m-0">Training Hub</h2>
              <p className="text-xs text-gray-500 m-0">Sales Team Guide</p>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          {filteredSections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-left mb-1 ${
                activeSection === section.id
                  ? 'bg-primary-100 text-primary-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {section.icon}
              <span className="text-sm">{section.title}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Version 1.0 | Last Updated: Jan 18, 2026
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Printer size={18} />
              Print Guide
            </button>
            <a
              href="https://ezmedtech.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Visit Ezmedtech.ai
            </a>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-6 py-8">
            {/* Introduction Section */}
            <section id="introduction" className="section-card">
              <h1>Ezmedtech Sales Team Training Guide</h1>
              <p className="text-gray-600 mb-6">
                <strong>Version 1.0</strong> | Last Updated: January 18, 2026
              </p>

              <h3>Welcome to Ezmedtech's Lead Generation Platform</h3>
              <p>
                This comprehensive platform is designed to streamline your sales process from lead discovery to deal closure. You'll be able to:
              </p>
              <ul className="list-disc">
                <li><strong>Discover high-quality clinic leads</strong> using Google Maps integration</li>
                <li><strong>Analyze lead quality</strong> with AI-powered insights</li>
                <li><strong>Send personalized emails</strong> with templates and tracking</li>
                <li><strong>Manage your sales pipeline</strong> with drag-and-drop simplicity</li>
                <li><strong>Track performance</strong> with real-time analytics</li>
              </ul>

              <h4>Who This Guide Is For</h4>
              <p>This guide is designed for:</p>
              <ul className="list-disc">
                <li>New sales team members joining Ezmedtech</li>
                <li>Existing team members looking to refresh their knowledge</li>
                <li>Sales managers training their teams</li>
              </ul>

              <h4>How to Use This Guide</h4>
              <ul className="list-disc">
                <li>Follow the workflows step-by-step for your first few leads</li>
                <li>Refer to the Quick Reference Guide for common tasks</li>
                <li>Use the search bar to find specific topics quickly</li>
              </ul>
            </section>

            {/* Getting Started Section */}
            <section id="getting-started" className="section-card">
              <h2>Getting Started</h2>
              
              <h3>Logging In</h3>
              <ol className="list-decimal">
                <li>Navigate to the platform URL provided by your manager</li>
                <li>Click "Sign In" and use your Ezmedtech credentials</li>
                <li>You'll be redirected to the dashboard after successful authentication</li>
              </ol>

              <h3>Initial Setup</h3>
              <p>Before you start working with leads, ensure:</p>
              <ul className="list-disc">
                <li>Your profile information is complete</li>
                <li>You understand your assigned territory (if applicable)</li>
                <li>You've reviewed the email templates available</li>
              </ul>
            </section>

            {/* Dashboard Overview Section */}
            <section id="dashboard" className="section-card">
              <h2>Dashboard Overview</h2>
              <img 
                src="/images/01_dashboard.png" 
                alt="Dashboard Overview" 
                className="w-full rounded-lg shadow-md mb-6"
              />
              
              <p>The dashboard is your command center, showing:</p>

              <h3>Key Metrics Cards</h3>
              <ol className="list-decimal">
                <li><strong>Total Leads</strong>: Number of leads in your database</li>
                <li><strong>High Priority Leads</strong>: Leads requiring immediate attention</li>
                <li><strong>Active Deals</strong>: Leads currently in your sales pipeline</li>
                <li><strong>This Month's Activity</strong>: Recent emails sent and calls made</li>
              </ol>

              <h3>Quick Actions</h3>
              <ul className="list-disc">
                <li><strong>Search for Leads</strong>: Start a new territory search</li>
                <li><strong>View Pipeline</strong>: See your active deals</li>
                <li><strong>Check Email Status</strong>: Monitor email engagement</li>
              </ul>

              <h3>Recent Activity Feed</h3>
              <p>Shows your team's latest actions:</p>
              <ul className="list-disc">
                <li>New leads added</li>
                <li>Emails sent</li>
                <li>Pipeline stage changes</li>
                <li>Comments and notes</li>
              </ul>
            </section>

            {/* Lead Generation Workflow Section */}
            <section id="lead-generation" className="section-card">
              <h2>Lead Generation Workflow</h2>

              <h3>Step 1: Search for Leads</h3>
              <img 
                src="/images/02_lead_search.png" 
                alt="Lead Search" 
                className="w-full rounded-lg shadow-md mb-6"
              />
              
              <p><strong>How to discover new clinic leads:</strong></p>
              <ol className="list-decimal">
                <li>Click <strong>"Lead Search"</strong> in the sidebar</li>
                <li>Select search parameters:
                  <ul className="list-disc ml-6">
                    <li><strong>Clinic Category</strong>: Choose dental, veterinary, or medical</li>
                    <li><strong>Search Type</strong>: State-wide or specific city/ZIP</li>
                    <li><strong>State</strong>: Select your target state</li>
                  </ul>
                </li>
                <li>Click <strong>"Search for Leads"</strong></li>
              </ol>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                <p className="text-blue-800 font-semibold m-0">💡 Pro Tip</p>
                <p className="text-blue-700 m-0">Start with state-wide searches to build a comprehensive lead list, then filter by priority.</p>
              </div>

              <h3>Step 2: Review and Filter Leads</h3>
              <img 
                src="/images/03_lead_management.png" 
                alt="Lead Management" 
                className="w-full rounded-lg shadow-md mb-6"
              />
              
              <p><strong>Managing your lead list:</strong></p>
              <ol className="list-decimal">
                <li>Navigate to <strong>"Lead Management"</strong> in the sidebar</li>
                <li>Use filters to find specific leads:
                  <ul className="list-disc ml-6">
                    <li><strong>Category</strong>: dental, veterinary, medical</li>
                    <li><strong>State/City</strong>: Geographic filters</li>
                    <li><strong>Priority</strong>: High, Medium, Low</li>
                    <li><strong>Product Fit</strong>: Automation, Marketing, Both</li>
                    <li><strong>Assigned To</strong>: See your leads or team leads</li>
                  </ul>
                </li>
                <li><strong>Bulk Actions</strong>:
                  <ul className="list-disc ml-6">
                    <li>Select multiple leads using checkboxes</li>
                    <li>Export to CSV or Excel for offline analysis</li>
                    <li>Assign leads to team members</li>
                  </ul>
                </li>
              </ol>

              <h3>Step 3: Analyze Individual Leads</h3>
              <img 
                src="/images/04_lead_detail.png" 
                alt="Lead Detail" 
                className="w-full rounded-lg shadow-md mb-6"
              />
              
              <p><strong>Deep-diving into a lead:</strong></p>
              <ol className="list-decimal">
                <li>Click <strong>"View"</strong> on any lead in the list</li>
                <li>Review the lead detail page sections:
                  <ul className="list-disc ml-6">
                    <li><strong>Contact Information</strong>: Phone, website, email, address</li>
                    <li><strong>Social Media Discovery</strong>: Find Instagram and LinkedIn profiles</li>
                    <li><strong>AI-Powered Analysis</strong>: Get quality assessment and recommendations</li>
                    <li><strong>Competitor Tool</strong>: Discover existing automation tools</li>
                    <li><strong>Activity Timeline</strong>: Log calls, meetings, and notes</li>
                    <li><strong>Team Comments</strong>: Collaborate with @mentions</li>
                  </ul>
                </li>
              </ol>
            </section>

            {/* Email Outreach Workflow Section */}
            <section id="email-outreach" className="section-card">
              <h2>Email Outreach Workflow</h2>

              <h3>Step 1: Compose Personalized Emails</h3>
              <p><strong>From the Lead Detail Page:</strong></p>
              <ol className="list-decimal">
                <li>Click <strong>"Send Email"</strong> button (top right)</li>
                <li>The email composer opens with:
                  <ul className="list-disc ml-6">
                    <li>Recipient pre-filled from lead data</li>
                    <li>Your email signature</li>
                    <li>Template selector</li>
                  </ul>
                </li>
              </ol>

              <h4>Email Composer Features:</h4>
              <ul className="list-disc">
                <li><strong>Template Selection</strong>: Choose from pre-written templates
                  <ul className="list-disc ml-6">
                    <li>Initial outreach</li>
                    <li>Follow-up emails</li>
                    <li>Demo invitations</li>
                    <li>Case studies</li>
                  </ul>
                </li>
                <li><strong>AI-Powered Personalization</strong>:
                  <ul className="list-disc ml-6">
                    <li>Click "Generate with AI" to create custom content</li>
                    <li>System personalizes based on clinic data and analysis</li>
                  </ul>
                </li>
                <li><strong>Marketing Materials Attachment</strong>:
                  <ul className="list-disc ml-6">
                    <li>Click "Attach Materials" to add brochures, case studies</li>
                    <li>Search and filter materials by category</li>
                    <li>Multiple attachments supported</li>
                  </ul>
                </li>
              </ul>

              <h3>Step 2: Send and Track</h3>
              <ol className="list-decimal">
                <li>Review your email for accuracy</li>
                <li>Click <strong>"Send Email"</strong></li>
                <li>Email is logged in:
                  <ul className="list-disc ml-6">
                    <li>Lead's activity timeline</li>
                    <li>Email tracking dashboard</li>
                    <li>Your personal activity feed</li>
                  </ul>
                </li>
              </ol>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                <p className="text-blue-800 font-semibold m-0">💡 Pro Tip</p>
                <p className="text-blue-700 m-0">Follow up within 24 hours if an email is opened but not replied to.</p>
              </div>
            </section>

            {/* Pipeline Management Section */}
            <section id="pipeline" className="section-card">
              <h2>Pipeline Management</h2>
              <img 
                src="/images/05_pipeline.png" 
                alt="Sales Pipeline" 
                className="w-full rounded-lg shadow-md mb-6"
              />

              <h3>Understanding Pipeline Stages</h3>
              <p>Your sales pipeline has 7 stages:</p>
              <ol className="list-decimal">
                <li><strong>New</strong>: Newly discovered leads (not yet contacted)</li>
                <li><strong>Contacted</strong>: Initial outreach made</li>
                <li><strong>Qualified</strong>: Lead confirmed as good fit</li>
                <li><strong>Proposal</strong>: Demo completed, proposal sent</li>
                <li><strong>Negotiation</strong>: Discussing terms and pricing</li>
                <li><strong>Closed Won</strong>: Deal successfully closed</li>
                <li><strong>Closed Lost</strong>: Deal lost (with reason tracked)</li>
              </ol>

              <h3>Moving Leads Through the Pipeline</h3>
              <p><strong>Drag-and-Drop Interface:</strong></p>
              <ol className="list-decimal">
                <li>Navigate to <strong>"Sales Pipeline"</strong></li>
                <li>Find the lead card you want to move</li>
                <li>Click and hold the card</li>
                <li>Drag to the appropriate stage column</li>
                <li>Release to drop</li>
              </ol>

              <h3>Best Practices</h3>
              <ul className="list-disc">
                <li>Move leads to "Contacted" immediately after first outreach</li>
                <li>Only move to "Qualified" after confirming budget and authority</li>
                <li>Update pipeline daily to keep metrics accurate</li>
                <li>Add notes when moving stages to explain reasoning</li>
              </ul>
            </section>

            {/* Analytics & Reporting Section */}
            <section id="analytics" className="section-card">
              <h2>Analytics and Reporting</h2>
              <img 
                src="/images/06_analytics.png" 
                alt="Analytics Dashboard" 
                className="w-full rounded-lg shadow-md mb-6"
              />

              <h3>Marketing Score Dashboard</h3>
              <p><strong>Top-Level Metrics:</strong></p>
              <ol className="list-decimal">
                <li><strong>Total Leads</strong>: Complete lead database size</li>
                <li><strong>No Social Media</strong>: Percentage without social presence (opportunity!)</li>
                <li><strong>High Priority</strong>: Leads needing immediate attention</li>
                <li><strong>Both Products</strong>: Leads that fit both Automation + Marketing</li>
              </ol>

              <h3>Visual Analytics</h3>
              <ul className="list-disc">
                <li><strong>Pipeline Funnel Chart</strong>: See lead distribution across stages</li>
                <li><strong>Product Fit Distribution</strong>: Automation vs Marketing vs Both</li>
                <li><strong>Sales Priority Distribution</strong>: High, Medium, Low breakdown</li>
                <li><strong>Patient Volume Distribution</strong>: Clinic size analysis</li>
                <li><strong>Category Performance</strong>: Lead count by clinic type</li>
                <li><strong>State-by-State Breakdown</strong>: Geographic performance</li>
              </ul>
            </section>

            {/* Best Practices Section */}
            <section id="best-practices" className="section-card">
              <h2>Best Practices</h2>

              <h3>Lead Generation</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="text-green-800 flex items-center gap-2 mt-0">✅ DO:</h4>
                  <ul className="list-disc text-green-700">
                    <li>Run state-wide searches to build comprehensive lists</li>
                    <li>Focus on high-priority leads first</li>
                    <li>Review AI analysis before first contact</li>
                    <li>Check for existing automation tools</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="text-red-800 flex items-center gap-2 mt-0">❌ DON'T:</h4>
                  <ul className="list-disc text-red-700">
                    <li>Skip lead analysis before outreach</li>
                    <li>Contact leads without researching their website</li>
                    <li>Ignore social media presence indicators</li>
                  </ul>
                </div>
              </div>

              <h3>Email Outreach</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="text-green-800 flex items-center gap-2 mt-0">✅ DO:</h4>
                  <ul className="list-disc text-green-700">
                    <li>Personalize every email with clinic-specific details</li>
                    <li>Use AI generation as a starting point, then customize</li>
                    <li>Attach relevant marketing materials</li>
                    <li>Follow up within 2-3 business days</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="text-red-800 flex items-center gap-2 mt-0">❌ DON'T:</h4>
                  <ul className="list-disc text-red-700">
                    <li>Send generic template emails without personalization</li>
                    <li>Use overly salesy language</li>
                    <li>Forget to proofread before sending</li>
                    <li>Spam leads with daily emails</li>
                  </ul>
                </div>
              </div>

              <h3>Daily Routine (Recommended)</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <h4 className="text-blue-800 mt-0">Morning (30 min)</h4>
                  <ul className="list-disc text-blue-700 mb-0">
                    <li>Review dashboard metrics</li>
                    <li>Check email engagement from yesterday</li>
                    <li>Plan today's outreach targets</li>
                  </ul>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                  <h4 className="text-purple-800 mt-0">Mid-Morning (2 hours)</h4>
                  <ul className="list-disc text-purple-700 mb-0">
                    <li>Send 10-15 personalized emails</li>
                    <li>Follow up on opened emails</li>
                    <li>Make qualification calls</li>
                  </ul>
                </div>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                  <h4 className="text-orange-800 mt-0">Afternoon (1 hour)</h4>
                  <ul className="list-disc text-orange-700 mb-0">
                    <li>Update pipeline stages</li>
                    <li>Log activities and notes</li>
                    <li>Research new high-priority leads</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4">
                  <h4 className="text-indigo-800 mt-0">End of Day (15 min)</h4>
                  <ul className="list-disc text-indigo-700 mb-0">
                    <li>Review progress against goals</li>
                    <li>Set tomorrow's priorities</li>
                    <li>Update any pending tasks</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Troubleshooting Section */}
            <section id="troubleshooting" className="section-card">
              <h2>Troubleshooting</h2>

              <h3>Common Issues and Solutions</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-gray-900 mt-0">"I can't find any leads in my territory"</h4>
                  <p className="font-semibold text-gray-700">Solution:</p>
                  <ol className="list-decimal text-gray-700">
                    <li>Check your search filters - you may have too many active</li>
                    <li>Try a state-wide search instead of city-specific</li>
                    <li>Expand to adjacent states</li>
                    <li>Contact your manager to discuss territory expansion</li>
                  </ol>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-gray-900 mt-0">"Email composer won't load"</h4>
                  <p className="font-semibold text-gray-700">Solution:</p>
                  <ol className="list-decimal text-gray-700">
                    <li>Refresh the page (Ctrl+R or Cmd+R)</li>
                    <li>Check that the lead has valid contact information</li>
                    <li>Clear browser cache and try again</li>
                    <li>Try a different browser</li>
                  </ol>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-gray-900 mt-0">"AI analysis button doesn't work"</h4>
                  <p className="font-semibold text-gray-700">Solution:</p>
                  <ol className="list-decimal text-gray-700">
                    <li>Ensure the lead has a website URL</li>
                    <li>Wait 30 seconds - analysis takes time</li>
                    <li>Try again - API may have been temporarily busy</li>
                    <li>Contact support if issue persists</li>
                  </ol>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-gray-900 mt-0">"Pipeline drag-and-drop not working"</h4>
                  <p className="font-semibold text-gray-700">Solution:</p>
                  <ol className="list-decimal text-gray-700">
                    <li>Make sure you're clicking and holding the lead card</li>
                    <li>Try using a mouse instead of trackpad</li>
                    <li>Refresh the page to reload the pipeline</li>
                    <li>Check that you have permission to edit the lead</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Quick Reference Section */}
            <section id="quick-reference" className="section-card">
              <h2>Quick Reference Guide</h2>

              <h3>Keyboard Shortcuts</h3>
              <table>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Shortcut</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Open search</td>
                    <td><code>Ctrl/Cmd + K</code></td>
                  </tr>
                  <tr>
                    <td>New email</td>
                    <td><code>E</code> (on lead detail page)</td>
                  </tr>
                  <tr>
                    <td>Save note</td>
                    <td><code>Ctrl/Cmd + Enter</code></td>
                  </tr>
                  <tr>
                    <td>Next lead</td>
                    <td><code>→</code> arrow key</td>
                  </tr>
                  <tr>
                    <td>Previous lead</td>
                    <td><code>←</code> arrow key</td>
                  </tr>
                </tbody>
              </table>

              <h3>Common Tasks Cheat Sheet</h3>
              
              <div className="space-y-3">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-gray-900 mt-0">Search for leads in Arizona dental clinics:</h4>
                  <p className="text-gray-700 mb-0 font-mono text-sm">Lead Search → Category: dental → State: Arizona → Search</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-gray-900 mt-0">Send personalized email:</h4>
                  <p className="text-gray-700 mb-0 font-mono text-sm">Find lead → View → Send Email → Generate with AI → Review → Send</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-gray-900 mt-0">Move lead to Qualified stage:</h4>
                  <p className="text-gray-700 mb-0 font-mono text-sm">Sales Pipeline → Find lead card → Drag to "Qualified" column</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-gray-900 mt-0">Export high-priority leads:</h4>
                  <p className="text-gray-700 mb-0 font-mono text-sm">Lead Management → Filter: Priority = High → Export CSV</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-gray-900 mt-0">Check this week's email performance:</h4>
                  <p className="text-gray-700 mb-0 font-mono text-sm">Email Tracking → Filter: This Week → Review metrics</p>
                </div>
              </div>

              <h3>Support and Resources</h3>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <h4 className="text-primary-800 mt-0">Technical Issues</h4>
                  <p className="text-primary-700 mb-2">Email: support@ezmedtech.ai</p>
                  <p className="text-primary-700 mb-0">Slack: #sales-support channel</p>
                </div>
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <h4 className="text-primary-800 mt-0">Sales Questions</h4>
                  <p className="text-primary-700 mb-2">Your sales manager</p>
                  <p className="text-primary-700 mb-0">Slack: #sales-team channel</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-600">
              <p>© 2026 Ezmedtech. All rights reserved.</p>
              <p className="text-sm mt-2">
                For the latest version of this guide, check the internal documentation portal or contact your manager.
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
