
// AI Detection utilities for river pollution monitoring

// Types for AI detection results
export interface DetectionResult {
  type: 'plastic' | 'oil' | 'debris' | 'chemical' | 'unknown';
  confidence: number;
  boundingBox?: { x: number, y: number, width: number, height: number };
  timestamp: number;
}

// Mock function to simulate AI detection on video frames
// In a real implementation, this would connect to a TensorFlow.js or ONNX model
export const detectPollutionInFrame = async (
  videoElement: HTMLVideoElement | null,
  canvas: HTMLCanvasElement | null
): Promise<DetectionResult[]> => {
  if (!videoElement || !canvas || videoElement.paused) {
    return [];
  }
  
  try {
    // Draw current video frame to canvas for analysis
    const ctx = canvas.getContext('2d');
    if (!ctx) return [];
    
    // Match canvas dimensions to video
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    
    // Draw the current frame to the canvas
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    
    // In a real implementation, we would:
    // 1. Get the image data: const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // 2. Preprocess for the model (resize, normalize)
    // 3. Run inference through TensorFlow.js or ONNX Runtime
    
    // For demo purposes, we'll simulate detections based on video timestamp
    // to show different types of pollution at different times
    const timestamp = videoElement.currentTime;
    const mockResults: DetectionResult[] = [];
    
    // Simulate different detections based on timestamp
    if (timestamp % 10 < 3) {
      // Plastic detection
      mockResults.push({
        type: 'plastic',
        confidence: 0.85 + Math.random() * 0.1,
        boundingBox: {
          x: canvas.width * 0.2 + (Math.random() * 0.1 * canvas.width),
          y: canvas.height * 0.3 + (Math.random() * 0.1 * canvas.height),
          width: canvas.width * 0.15,
          height: canvas.height * 0.15
        },
        timestamp
      });
    } else if (timestamp % 10 < 6) {
      // Oil spill detection
      mockResults.push({
        type: 'oil',
        confidence: 0.78 + Math.random() * 0.15,
        boundingBox: {
          x: canvas.width * 0.5 + (Math.random() * 0.1 * canvas.width),
          y: canvas.height * 0.6 + (Math.random() * 0.1 * canvas.height),
          width: canvas.width * 0.3,
          height: canvas.height * 0.1
        },
        timestamp
      });
    } else if (timestamp % 10 < 9) {
      // Chemical detection (based on water color)
      mockResults.push({
        type: 'chemical',
        confidence: 0.72 + Math.random() * 0.1,
        boundingBox: {
          x: canvas.width * 0.3,
          y: canvas.height * 0.4,
          width: canvas.width * 0.4,
          height: canvas.height * 0.3
        },
        timestamp
      });
    }
    
    // Visualize the detections on canvas
    if (mockResults.length > 0) {
      visualizeDetections(ctx, mockResults);
    }
    
    return mockResults;
  } catch (error) {
    console.error("Error in AI detection:", error);
    return [];
  }
};

// Visualize detections on the canvas
export const visualizeDetections = (
  ctx: CanvasRenderingContext2D,
  detections: DetectionResult[]
) => {
  detections.forEach(detection => {
    if (!detection.boundingBox) return;
    
    const { x, y, width, height } = detection.boundingBox;
    
    // Set styles based on pollution type
    switch (detection.type) {
      case 'plastic':
        ctx.strokeStyle = '#f59e0b'; // Amber
        ctx.fillStyle = 'rgba(245, 158, 11, 0.3)';
        break;
      case 'oil':
        ctx.strokeStyle = '#7c3aed'; // Purple
        ctx.fillStyle = 'rgba(124, 58, 237, 0.3)';
        break;
      case 'chemical':
        ctx.strokeStyle = '#ef4444'; // Red
        ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
        break;
      case 'debris':
        ctx.strokeStyle = '#84cc16'; // Lime
        ctx.fillStyle = 'rgba(132, 204, 22, 0.3)';
        break;
      default:
        ctx.strokeStyle = '#3b82f6'; // Blue
        ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
        break;
    }
    
    // Draw bounding box
    ctx.lineWidth = 2;
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);
    
    // Add label with confidence
    ctx.font = '12px sans-serif';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    const label = `${detection.type} (${Math.round(detection.confidence * 100)}%)`;
    ctx.strokeText(label, x, y - 5);
    ctx.fillText(label, x, y - 5);
  });
};

// Function to analyze water quality from sensor data and detect anomalies
export const detectAnomalies = (sensorData: any[]): { 
  isAnomaly: boolean; 
  parameter?: string; 
  message?: string;
  severity?: 'low' | 'medium' | 'high' 
} => {
  // Simple threshold-based anomaly detection
  // In a real implementation, this would use more sophisticated ML models
  
  if (!sensorData || sensorData.length === 0) {
    return { isAnomaly: false };
  }
  
  const latestData = sensorData[sensorData.length - 1];
  
  // Check pH levels (normal range 6.5-8.5)
  if (latestData.ph < 5.5) {
    return {
      isAnomaly: true,
      parameter: 'pH',
      message: `Water acidity is too high (pH ${latestData.ph.toFixed(2)})`,
      severity: latestData.ph < 4.5 ? 'high' : 'medium'
    };
  }
  
  if (latestData.ph > 9.0) {
    return {
      isAnomaly: true,
      parameter: 'pH',
      message: `Water alkalinity is too high (pH ${latestData.ph.toFixed(2)})`,
      severity: latestData.ph > 10.0 ? 'high' : 'medium'
    };
  }
  
  // Check dissolved oxygen (healthy is typically > 5 mg/L)
  if (latestData.do < 4.0) {
    return {
      isAnomaly: true,
      parameter: 'Dissolved Oxygen',
      message: `Low dissolved oxygen level (${latestData.do.toFixed(2)} mg/L)`,
      severity: latestData.do < 2.0 ? 'high' : 'medium'
    };
  }
  
  // Check turbidity (normal < 50 NTU for rivers)
  if (latestData.turbidity > 60) {
    return {
      isAnomaly: true,
      parameter: 'Turbidity',
      message: `High turbidity detected (${latestData.turbidity.toFixed(1)} NTU)`,
      severity: latestData.turbidity > 100 ? 'high' : 'medium'
    };
  }
  
  // No anomalies detected
  return { isAnomaly: false };
};
