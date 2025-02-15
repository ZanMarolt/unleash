import useProject, {
    useProjectNameOrId,
} from 'hooks/api/getters/useProject/useProject';
import { ProjectFeatureToggles } from './ProjectFeatureToggles/ProjectFeatureToggles';
import ProjectInfo from './ProjectInfo/ProjectInfo';
import { useStyles } from './Project.styles';
import { usePageTitle } from 'hooks/usePageTitle';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import { useLastViewedProject } from '../../../hooks/useLastViewedProject';
import { useEffect } from 'react';

const refreshInterval = 15 * 1000;

const ProjectOverview = () => {
    const projectId = useRequiredPathParam('projectId');
    const projectName = useProjectNameOrId(projectId);
    const { project, loading } = useProject(projectId, { refreshInterval });
    const { members, features, health, description, environments } = project;
    const { classes: styles } = useStyles();
    usePageTitle(`Project overview – ${projectName}`);
    const { setLastViewed } = useLastViewedProject();

    useEffect(() => {
        setLastViewed(projectId);
    }, [projectId, setLastViewed]);

    return (
        <div className={styles.containerStyles}>
            <ProjectInfo
                id={projectId}
                description={description}
                memberCount={members}
                health={health}
                featureCount={features?.length}
            />
            <div className={styles.projectToggles}>
                <ProjectFeatureToggles
                    features={features}
                    environments={environments}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default ProjectOverview;
