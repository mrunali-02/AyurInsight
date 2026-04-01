import { Scatter } from 'react-chartjs-2';

const ClusterScatter = ({ points, title, isDbscan = false }) => {
  // Group points by cluster
  const clusters = {};
  points.forEach(point => {
    if (!clusters[point.cluster]) {
      clusters[point.cluster] = [];
    }
    clusters[point.cluster].push({ x: point.x, y: point.y });
  });

  const colors = [
    'rgba(13, 148, 136, 0.7)', // teal
    'rgba(245, 158, 11, 0.7)', // amber
    'rgba(139, 92, 246, 0.7)', // purple
    'rgba(59, 130, 246, 0.7)', // blue
    'rgba(236, 72, 153, 0.7)', // pink
  ];

  const datasets = Object.keys(clusters).map((clusterId, index) => {
    const isNoise = clusterId === '-1';
    
    return {
      label: isNoise ? 'Noise' : `Cluster ${clusterId}`,
      data: clusters[clusterId],
      backgroundColor: isNoise ? 'rgba(156, 163, 175, 0.5)' : colors[index % colors.length], // Gray for noise
      borderColor: isNoise ? 'rgba(107, 114, 128, 0.8)' : colors[index % colors.length].replace('0.7', '1'),
      borderWidth: 1,
      pointRadius: isNoise ? 3 : 5,
      pointHoverRadius: isNoise ? 5 : 7,
    };
  });

  const data = {
    datasets
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: !!title,
        text: title
      },
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `(${context.raw.x.toFixed(2)}, ${context.raw.y.toFixed(2)})`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'PCA Component 1'
        }
      },
      y: {
        title: {
          display: true,
          text: 'PCA Component 2'
        }
      }
    }
  };

  return <Scatter data={data} options={options} />;
};

export default ClusterScatter;
