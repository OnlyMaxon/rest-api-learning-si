# Planning Guide

An educational web application that demonstrates REST API communication between frontend and backend, showing HTTP methods (GET, POST, PUT, DELETE) with real-time request/response visualization.

**Experience Qualities**:
1. **Educational** - Clear visual feedback showing exactly what happens during each API call
2. **Interactive** - Hands-on exploration of different HTTP methods and their effects
3. **Transparent** - All request details and responses are visible to understand the complete flow

**Complexity Level**: Light Application (multiple features with basic state)
  - Multiple CRUD operations with visual feedback and request/response inspection panels

## Essential Features

### User Management CRUD
- **Functionality**: Create, read, update, and delete user records
- **Purpose**: Demonstrate all four main REST API operations with a familiar data model
- **Trigger**: Buttons for each operation (Add User, Edit, Delete)
- **Progression**: Click action → Show request details → Execute API call → Display response → Update UI
- **Success criteria**: Users can see the HTTP method, endpoint, headers, body, and response for each operation

### Request Inspector
- **Functionality**: Display detailed information about each API request before it's sent
- **Purpose**: Show what data is actually being sent to the backend
- **Trigger**: Automatically appears when user initiates any API action
- **Progression**: Action triggered → Request panel shows method/URL/headers/body → User confirms → Response displayed
- **Success criteria**: Clear visualization of HTTP method, endpoint URL, request headers, and JSON body

### Response Viewer
- **Functionality**: Show the backend response including status code, headers, and response body
- **Purpose**: Demonstrate what the backend returns and how to interpret it
- **Trigger**: Automatically appears after API call completes
- **Progression**: API call completes → Response panel shows status/headers/body → UI updates based on response
- **Success criteria**: Status codes are color-coded (2xx green, 4xx yellow, 5xx red), response JSON is formatted

### API Method Examples
- **Functionality**: Pre-built examples for each REST method (GET, POST, PUT, DELETE)
- **Purpose**: Provide ready-to-use examples that users can execute immediately
- **Trigger**: Click on example cards or method tabs
- **Progression**: Select example → Request pre-fills → Execute → See response → Learn pattern
- **Success criteria**: Each HTTP method has at least one clear example with explanatory text

## Edge Case Handling
- **Network Errors**: Show friendly error messages when simulated API calls fail
- **Empty State**: Display helpful instructions when no users exist yet
- **Loading States**: Show loading indicators during API calls
- **Invalid Input**: Validate form fields and show inline error messages

## Design Direction
The design should feel educational and approachable, like a coding tutorial come to life - clear typography, generous spacing, and visual distinction between request and response sections to reinforce the client-server mental model.

## Color Selection
Complementary (opposite colors) - Using blue for requests and green for successful responses creates clear visual distinction between client actions and server responses, with orange accents for important interactions.

- **Primary Color**: Deep Blue oklch(0.45 0.15 250) - Represents client/request side, trustworthy and technical
- **Secondary Colors**: Sage Green oklch(0.55 0.12 150) for success responses, creating visual separation from requests
- **Accent Color**: Vibrant Orange oklch(0.65 0.18 40) for interactive elements and call-to-action buttons
- **Foreground/Background Pairings**:
  - Background (Light Gray oklch(0.98 0 0)): Dark text oklch(0.2 0 0) - Ratio 14:1 ✓
  - Card (White oklch(1 0 0)): Dark text oklch(0.2 0 0) - Ratio 16:1 ✓
  - Primary (Deep Blue oklch(0.45 0.15 250)): White text oklch(1 0 0) - Ratio 8.5:1 ✓
  - Secondary (Sage Green oklch(0.55 0.12 150)): White text oklch(1 0 0) - Ratio 5.2:1 ✓
  - Accent (Vibrant Orange oklch(0.65 0.18 40)): White text oklch(1 0 0) - Ratio 4.8:1 ✓
  - Muted (Light Gray oklch(0.95 0 0)): Medium text oklch(0.45 0 0) - Ratio 6.2:1 ✓

## Font Selection
Clean, modern sans-serif typefaces that feel technical but approachable - Inter for its excellent readability in code-adjacent contexts and crisp rendering at small sizes for displaying JSON data.

- **Typographic Hierarchy**:
  - H1 (Page Title): Inter Bold/32px/tight letter spacing
  - H2 (Section Headers): Inter SemiBold/24px/normal spacing
  - H3 (Card Titles): Inter Medium/18px/normal spacing
  - Body (Instructions): Inter Regular/16px/relaxed line height (1.6)
  - Code (JSON/URLs): JetBrains Mono Regular/14px/monospace for technical content
  - Labels: Inter Medium/14px/slight letter spacing

## Animations
Subtle and functional - animations should guide attention to the request→response flow and provide feedback for interactions, with smooth transitions that reinforce the sequential nature of API communication.

- **Purposeful Meaning**: Smooth slide-ins for request/response panels emphasize the temporal sequence of API calls
- **Hierarchy of Movement**: Primary focus on request→response transitions, secondary on CRUD operations updating the list

## Component Selection
- **Components**:
  - Card: For user list items and request/response panels with subtle shadows
  - Button: Primary (accent) for main actions, Secondary for cancel/reset, Destructive for delete
  - Dialog: For add/edit user forms with clear call-to-action
  - Badge: For HTTP method labels (GET/POST/PUT/DELETE) with color coding
  - Separator: To divide request and response sections visually
  - ScrollArea: For displaying long JSON responses
  - Input & Label: For form fields with clear focus states
  - Tabs: For switching between different API method examples
  
- **Customizations**:
  - Syntax-highlighted JSON viewer component for request/response bodies
  - HTTP status code badge with color coding (2xx green, 4xx yellow, 5xx red)
  - Split panel layout showing request on left, response on right
  
- **States**:
  - Buttons: Distinct hover with slight scale, active with pressed effect, loading with spinner
  - Inputs: Clear focus ring in accent color, error state in destructive red
  - Cards: Subtle hover elevation for interactive items
  
- **Icon Selection**:
  - Plus for add user
  - PencilSimple for edit
  - Trash for delete
  - ArrowRight for send request
  - Check for success
  - Warning for errors
  - Code for JSON viewer
  
- **Spacing**: 
  - Container padding: p-6 to p-8
  - Card gaps: gap-4 for tight groups, gap-6 for sections
  - Form fields: space-y-4
  - Section separation: mb-8 to mb-12
  
- **Mobile**: 
  - Stack request/response panels vertically on small screens
  - Full-width buttons on mobile
  - Collapsible sections for request details
  - Touch-friendly button sizing (min 44px height)
