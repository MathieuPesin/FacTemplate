export interface TemplateData {
  header: {
    logo: string;
    navigation: string[];
  };
  presentation: {
    title: string;
    subtitle: string;
    keyMetrics: {
      icon: string;
      title: string;
      value: string;
      color: string;
      bgColor: string;
    }[];
    mission: {
      title: string;
      description: string;
    };
    environmentalActions: {
      title: string;
      actions: string[];
    };
  };
  functions: {
    title: string;
    subtitle: string;
    wheel: {
      svgPath: string;
      sections: {
        title: string;
        color: string;
        items: {
          text: string;
          percentage: number;
        }[];
      }[];
    };
  };
  activities: {
    title: string;
    subtitle: string;
    description: string;
    visualization: {
      svgPath: string;
    };
  };
  timeline: {
    title: string;
    subtitle: string;
    description: string;
    visualization: {
      svgPath: string;
    };
  };
  theme: {
    colors: {
      primary: string;
      secondary: string;
      text: {
        primary: string;
        secondary: string;
      };
      background: {
        primary: string;
        secondary: string;
      };
      functions: {
        aligner: string;
        animer: string;
        orchestrer: string;
      };
    };
    spacing: {
      sectionPadding: string;
      contentMaxWidth: string;
    };
  };
}
