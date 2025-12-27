# Preloader Fix Design Document

## Overview

The current preloader implementation has a critical bug where it gets stuck at 99% and never progresses to 100%, requiring users to reload the page. The root cause is:

1. **Artificial 99% Cap**: Progress is artificially capped at 99% until `assetsLoaded` becomes true
2. **Complex Asset Detection**: The asset loading detection logic is overly complex and frequently fails to detect when assets are ready
3. **Blocking Completion**: The preloader waits indefinitely for asset detection that may never succeed

This design outlines a simplified, reliable approach that eliminates the 99% cap and ensures the preloader always completes successfully within a reasonable timeframe.

## Architecture

The fix will eliminate the problematic 99% cap and complex asset detection by implementing:

1. **Remove 99% Cap**: Allow progress to reach 100% naturally without artificial blocking
2. **Simplified Completion Logic**: Use video end event as the primary completion trigger
3. **Timeout Safety Net**: Implement maximum duration timeout to guarantee completion
4. **Immediate Transition**: When video ends, immediately proceed to 100% and trigger curtain lift
5. **Fallback Mechanisms**: Multiple completion paths to ensure reliability

### Key Changes from Current Implementation

**Current (Broken) Logic:**
```javascript
// Problematic: Caps at 99% until complex asset detection succeeds
if (!assetsLoaded && prev >= 95) {
  return Math.min(prev + 0.3, 99); // STUCK HERE!
}
```

**New (Fixed) Logic:**
```javascript
// Simple: Progress naturally to 100%, complete when video ends
const increment = prev < 60 ? 5 : prev < 85 ? 3 : 1;
return Math.min(prev + increment, 100); // NO CAP!
```

## Components and Interfaces

### Core Components

**PreloaderController**
- Manages progress state and completion logic
- Handles multiple completion triggers
- Provides fallback mechanisms

**ProgressAnimator** 
- Animates progress from 0% to 100%
- Uses smooth, predictable timing
- No artificial caps or blocking

**CompletionTrigger**
- Monitors video end event
- Implements timeout-based completion
- Handles onComplete callback execution

### State Management

```javascript
const [loadingProgress, setLoadingProgress] = useState(0);
const [isCompleting, setIsCompleting] = useState(false);
const [videoEnded, setVideoEnded] = useState(false);
```

## Data Models

### Progress State
```javascript
{
  progress: number,        // 0-100
  isCompleting: boolean,   // Completion in progress
  videoEnded: boolean,     // Video playback completed
  startTime: number        // Timestamp when preloader started
}
```

### Configuration
```javascript
{
  maxDuration: 8000,       // Maximum preloader duration (8 seconds)
  progressInterval: 100,   // Progress update interval (100ms)
  completionDelay: 500     // Delay before curtain lift (500ms)
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*
### Property Reflection

After reviewing all testable properties from the prework analysis, I identified several areas where properties can be consolidated:

**Redundancy Analysis:**
- Properties 1.1, 2.1, 2.3, and 3.5 all relate to timeout-based completion and can be combined into one comprehensive timeout property
- Properties 1.3 and 3.3 both test video end triggering completion and can be merged
- Properties 1.4, 2.2, and 2.5 all test resilience to loading issues and can be consolidated
- Properties 1.2 and 3.4 both test progress completion triggering next phase

**Consolidated Properties:**

Property 1: Timeout-based completion guarantee
*For any* preloader instance, progress should reach 100% and trigger completion within the maximum timeout duration, regardless of asset loading status
**Validates: Requirements 1.1, 2.1, 2.3, 3.5**

Property 2: Video end triggers completion
*For any* preloader video, when the video ends, the system should immediately proceed to completion without additional blocking conditions
**Validates: Requirements 1.3, 3.3**

Property 3: Progress completion triggers curtain lift
*For any* preloader instance, when progress reaches 100%, the curtain lift animation should be triggered without requiring additional asset verification
**Validates: Requirements 1.2, 3.4**

Property 4: Resilient completion under loading failures
*For any* preloader instance with failed or slow asset loading, the system should still complete successfully using fallback mechanisms
**Validates: Requirements 1.4, 2.2, 2.5**

Property 5: Completion callback execution
*For any* completed preloader, the onComplete callback should be executed to properly transition to the main application
**Validates: Requirements 1.5**

## Error Handling

### Timeout Handling
- Maximum preloader duration: 8 seconds
- Automatic completion if timeout exceeded
- Progress forced to 100% on timeout

### Video Loading Failures
- Fallback to time-based completion if video fails to load
- Continue with static loading indicator if video unavailable
- Maintain completion timeline regardless of video status

### Asset Loading Failures
- Non-blocking asset detection
- Completion proceeds even with failed assets
- Graceful degradation for missing resources

### Browser Compatibility
- Fallback for browsers without video support
- Alternative completion triggers for older browsers
- Consistent behavior across different environments

## Testing Strategy

### Unit Testing Approach
- Test individual completion triggers (timeout, video end, progress)
- Verify state transitions and callback execution
- Test error handling and fallback mechanisms
- Mock video elements and asset loading for controlled testing

### Property-Based Testing Approach
- Use **Jest** with **fast-check** library for property-based testing
- Generate random timing scenarios and verify completion guarantees
- Test completion under various simulated network conditions
- Verify properties hold across different browser environments
- Configure each property test to run minimum 100 iterations

**Property Test Requirements:**
- Each property-based test must reference its corresponding design property
- Tests must use the format: '**Feature: preloader-fix, Property {number}: {property_text}**'
- All property tests must be tagged with requirement validation comments
- Property tests should focus on universal behaviors across all valid inputs

### Integration Testing
- Test complete preloader lifecycle in browser environment
- Verify smooth transition to main application
- Test under simulated slow network conditions
- Validate visual animations and timing