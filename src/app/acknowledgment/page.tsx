import {
  ExternalLink,
  Database,
  Lightbulb,
  Code,
  Image as ImageIcon,
  Paintbrush,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// Technology data
const technologies = [
  { name: 'Next.js', description: 'React framework' },
  { name: 'Tailwind CSS', description: 'Styling' },
  { name: 'shadcn/ui', description: 'UI components' },
  { name: 'D3.js', description: 'Data visualization' },
  { name: 'Three.js', description: '3D graphics' },
  { name: 'React Three Fiber', description: 'React 3D' },
  { name: 'Lucide React', description: 'Icon library' },
  { name: 'Radix UI', description: 'UI primitives' },
  { name: 'TypeScript', description: 'Type safety' },
];

// Technology item component
const TechnologyItem = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">{name}</span>
      <span className="text-sm text-muted-foreground">- {description}</span>
    </div>
  );
};

const AcknowledgementCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
}) => {
  return (
    <div className="p-4 border rounded-lg space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      {description}
    </div>
  );
};

function Acknowledgement() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Acknowledgements</h1>
        <p className="text-muted-foreground">
          This project would not be possible without the contributions and
          resources from the following sources.
        </p>
      </div>

      {/* Data Sources */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Data Sources</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <AcknowledgementCard
            title="Periodic Table of Elements Data"
            icon={<ExternalLink className="h-4 w-4 text-primary" />}
            description={
              <p className="text-sm text-muted-foreground">
                The data use here is a combination between 2 data source from
                the periodic table data curated by{' '}
                <Link
                  href="https://github.com/Bowserinator/Periodic-Table-JSON/blob/master/PeriodicTableJSON.json"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bowserinator
                  <ExternalLink className="h-3 w-3" />
                </Link>{' '}
                and{' '}
                <Link
                  href="https://gist.github.com/robertwb/22aa4dbfb6bcecd94f2176caa912b952"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  robertwb
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </p>
            }
          />

          <AcknowledgementCard
            title="Images of Elements"
            icon={<ImageIcon className="h-4 w-4 text-primary" />}
            description={
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  High-quality photographs of chemical elements under various
                  conditions and states.
                </p>
                <Link
                  href="https://images-of-elements.com/"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Source <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            }
          />

          <AcknowledgementCard
            title="MatterViz"
            icon={<Lightbulb className="h-4 w-4 text-primary" />}
            description={
              <p className="text-sm text-muted-foreground">
                This project was inspired by{' '}
                <Link
                  href="https://github.com/janosh/matterviz"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MatterViz <ExternalLink className="h-3 w-3" />
                </Link>{' '}
                work on 3D Bohr model assets and educational resources for
                interactive element visualization.
              </p>
            }
          />

          <AcknowledgementCard
            title="Design Inspiration"
            icon={<Paintbrush className="h-4 w-4 text-primary" />}
            description={
              <p className="text-sm text-muted-foreground">
                This project also take inspiration from the google experiments
                from{' '}
                <Link
                  href="https://artsexperiments.withgoogle.com/periodic-table/"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Experiment with Google Periodic Table{' '}
                  <ExternalLink className="h-3 w-3" />
                </Link>{' '}
                for its clean and modern design and the way it present the data.
              </p>
            }
          />
        </div>
      </section>

      {/* Technologies & Libraries */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Technologies & Libraries</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech, index) => (
            <TechnologyItem
              key={index}
              name={tech.name}
              description={tech.description}
            />
          ))}
        </div>
      </section>

      {/* Licenses */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Licenses & Attribution</h2>
        <div className="p-4 border rounded-lg space-y-2">
          <p className="text-sm text-muted-foreground">
            Element images are used under Creative Commons licenses. Each image
            includes proper attribution to the original photographers and
            sources.
          </p>
          <p className="text-sm text-muted-foreground">
            This project is open source and available under the MIT License.
          </p>
        </div>
      </section>

      {/* Back to Home */}
      <div className="text-center pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          ← Back to Periodic Table
        </Link>
      </div>
    </div>
  );
}

export default Acknowledgement;
